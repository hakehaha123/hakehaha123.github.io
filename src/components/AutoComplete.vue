<template>
  <div class="ac__container">
    <div class="ac__input_box">
      <div class="ac__selected-items">
        <span v-for="(item, index) in selectedItems" :key="item">
          {{ item }}
          <button @click="deselcetItem(item)" type="button" aria-label="deselect">
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10">
              <path :d="closeBtnPath">
              </path>
            </svg>
          </button>
        </span>
        <input type="search" v-model="searchInput" @blur="onBlur" @input="inputChanged" @click="onFocus"
          @keyup.esc="escape" @keyup.enter="enter" @keydown.up="up" @keydown.down="down" @keydown.backspace="backspace"
          autocomplete="off" />
      </div>
    </div>
    <div class="ac__filtered-items" v-show="canShowFilteredItems">
      <div class="ac__filtered-item" :class="{ 'ac__filtered-item__hovered': index === cursor }"
        v-for="(item, index) in filteredItems" :key="index" @click="selectItem(item)" @mouseover="cursor = index">
        <div>{{ item }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "auto-complete",
  data() {
    return {
      selectedItems: new Array<string>(),
      searchInput: "",
      showItems: false,
      filteredItems: new Array<string>(),
      cursor: 0,
      tempObjectItems: new Array<unknown>(),
      closeBtnPath: "M6.895455 5l2.842897-2.842898c.348864-.348863.348864-.914488 0-1.263636L9.106534.261648c-.348864-.348864-.914489-.348864-1.263636 0L5 3.104545 2.157102.261648c-.348863-.348864-.914488-.348864-1.263636 0L.261648.893466c-.348864.348864-.348864.914489 0 1.263636L3.104545 5 .261648 7.842898c-.348864.348863-.348864.914488 0 1.263636l.631818.631818c.348864.348864.914773.348864 1.263636 0L5 6.895455l2.842898 2.842897c.348863.348864.914772.348864 1.263636 0l.631818-.631818c.348864-.348864.348864-.914489 0-1.263636L6.895455 5z",
      errors: "",
      errorsShow: false
    };
  },
  props: {
    value: {
      type: Array,
      required: true
    },
    items: {
      type: Array,
      required: true
    },
    objectMatchkey: {
      type: String,
      required: false
    },
    template: {
      type: Object,
      required: false
    }
  },
  mounted() {
    this.setFilteredItems();
  },
  computed: {
    canShowFilteredItems(): boolean {
      return this.showItems && !!this.filteredItems.length;
    }
  },
  watch: {
    searchInput(newInput) {
      this.setFilteredItems(newInput);
    }
  },
  methods: {
    onBlur() {
      setTimeout(() => (this.showItems = false, this.$emit("blur")), 200);
    },
    onFocus() {
      this.showItems = true;
      this.$emit("focus")
    },
    inputChanged() {
      this.showItems = true;
      this.$emit("inputChanged", this.searchInput);
    },
    setFilteredItems(newInput = "") {
      const areItemsOfStringtype: boolean = this.items.every(
        item => item && typeof item === "string"
      );
      if (areItemsOfStringtype) {
        this.setFilteredItemsForStringType(newInput);
      } else if (this.items.every(item => item && typeof item === "object")) {
        this.setFilteredItemsForObjectType(newInput);
      }

      this.cursor = 0;
    },
    setFilteredItemsForStringType(newInput: string) {
      const matchedItems: unknown[] = this.items.filter(item => {
        const stringItem: string = item as string;
        return this.isMatchFoundInStringItem(stringItem, newInput);
      });
      this.filteredItems = matchedItems.map(item => String(item));
    },
    setFilteredItemsForObjectType(newInput: string) {
      const matchedItems: unknown[] = this.items.filter(item => {
        const objectItem: unknown = item as unknown;
        return this.isMatchFoundInObjectItem(objectItem, newInput);
      });
      this.tempObjectItems.splice(0, this.tempObjectItems.length);
      this.filteredItems =
        matchedItems.length > 0
          ? matchedItems.map(item =>
            this.constructFileteredItemFromObject(item)
          )
          : this.items.map(item => this.constructFileteredItemFromObject(item));
    },
    constructFileteredItemFromObject(item: unknown) {
      let stringItem = "";
      if (item && typeof item === "object") {
        if (this.template) {
          stringItem = this.getStringItemBasedOnTemplate(item);
        } else {
          stringItem = String(
            item[this.objectMatchkey as keyof typeof item] ?? ""
          );
        }
      }
      return stringItem;
    },
    getStringItemBasedOnTemplate(item: unknown) {
      if (item && typeof item === "object") {
        if (this.template && this.template.keys) {
          const templateKeys: string[] = this.template.keys as string[];
          const itemValues = templateKeys.map(
            key => item[key as keyof typeof item] as string
          );
          this.tempObjectItems.push(item);
          return itemValues.join(this.template.separator);
        }

        return String(item[this.objectMatchkey as keyof typeof item]);
      }

      return "";
    },
    isMatchFoundInStringItem(item: string, newInput: string) {
      const reg: RegExp = new RegExp(newInput.split('').join('.*'), 'i')
      return reg.test(item);
    },
    isMatchFoundInObjectItem(item: unknown, newInput: string) {
      if (item && typeof item === "object" && newInput && this.objectMatchkey) {
        const itemValue: string =
          item[this.objectMatchkey as keyof typeof item];
        const isMatchFound: boolean = this.isMatchFoundInStringItem(itemValue, newInput);
        return isMatchFound;
      }

      return false;
    },
    selectItem(item: string) {
      if (item) {
        this.searchInput = "";
        if (this.selectedItems.indexOf(item) == -1) {
          this.selectedItems.push(item);
        }
        this.$el.querySelector("input")?.focus();
        this.$emit("focus");
        this.$emit("inputChanged", this.searchInput);
        this.$emit("input", [...this.selectedItems]);
        this.showItems = false;
      }
    },
    deselcetItem(selectItem: string) {
      const index: number = this.selectedItems.findIndex(item => selectItem === item);
      if (index > -1) {
        this.selectedItems.splice(index, 1);
        this.$emit("input", [...this.selectedItems]);
      }
    },
    backspace() {
      if (this.searchInput == "") {
        this.selectedItems.splice(-1, 1);
        this.$emit("input", [...this.selectedItems]);
      }
    },
    enter() {
      if (this.showItems && this.filteredItems[this.cursor]) {
        this.selectItem(this.filteredItems[this.cursor]);
        this.$emit("inputChanged", this.searchInput);
        this.showItems = false;
      }
    },
    up() {
      if (this.cursor > -1) {
        this.cursor--;
        this.$el.getElementsByClassName("ac__filtered-item")[this.cursor];
      }
    },
    down() {
      this.showItems = true;
      if (this.cursor < this.filteredItems.length) {
        this.cursor++;
        this.$el.getElementsByClassName("ac__filtered-item")[this.cursor];
      }
    },
    escape() {
      this.showItems = !this.showItems;
    },
    clear() {
      this.selectedItems = [];
      this.searchInput = "";
    }
  }
});
</script>

<style lang="scss" scoped>
.ac__container {
  position: relative;
  background: white;
}

.ac__input_box {
  appearance: none;
  display: flex;
  padding: 0 0 4px;
  background: inherit;
  border: 1px solid #16BFB7;
  border-radius: var(--vs-border-radius);
  white-space: normal;
  overflow: hidden;
}

.ac__selected-items {
  display: flex;
  flex-basis: 100%;
  flex-grow: 1;
  flex-wrap: wrap;
  padding: 0 2px;
  position: relative;
  font-size: 12px;
  line-height: 20px;
  min-height: 30px;

  >span {
    display: flex;
    align-items: center;
    background-color: #f0f0f0;
    border: 1px solid rgba(60, 60, 60, 0.26);
    border-radius: 4px;
    margin: 4px 2px 0;
    padding: 0 5px;
    z-index: 0;
    min-height: 20px;

    >button {
      display: inline-flex;
      appearance: none;
      margin-left: 4px;
      padding: 0;
      border: 0;
      cursor: pointer;
      background: none;
      fill: rgba(60, 60, 60, 0.5);
      text-shadow: 0 1px 0 #fff;
    }
  }

  input {
    color: inherit;
    appearance: none;
    border: 1px solid transparent;
    border-left: none;
    outline: none;
    margin: 4px 0 0;
    padding: 0 7px;
    background: none;
    box-shadow: none;
    width: 0;
    max-width: 100%;
    flex-grow: 1;
    z-index: 1;
  }
}

.ac__filtered-items {
  display: block;
  box-sizing: border-box;
  position: absolute;
  top: calc(100% - 1px);
  left: 0;
  z-index: 999;
  padding: 0;
  width: 100%;
  max-height: 350px;
  overflow-y: auto;
  box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.15);
  border: 1px solid #16BFB7;
  border-top-style: none;
  text-align: left;
  list-style: none;
  background: inherit;

  .ac__filtered-item {
    cursor: pointer;

    &.ac__filtered-item__hovered {
      background-color: #16BFB7;
      color: white;
    }
  }
}
</style>
