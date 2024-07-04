<template>
  <div class="hello">
    <div>{{ $t('home_page') }}</div>
    <div class="select-box">
      <input
        type="text"
        v-model="lang"
        readonly
        @focus="isOpen = true"
        @blur="handleBlur"
      />
      <div class="options" :class="{ open: isOpen }">
        <p
          v-for="item in options"
          :key="item"
          @click="lang = item"
          class="option"
        >
          {{ item }}
        </p>
      </div>
    </div>
    <button class="button" @click="handleClick">{{ $t('toggle') }}</button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      lang: 'en',
      isOpen: false,
      options: []
    }
  },
  mounted() {
    this.options = require
      .context('../i18n/languages', true, /\.js$/)
      .keys()
      .map((key) => key.replace(/\.\/|\.js/g, ''))
  },
  methods: {
    handleClick() {
      this.$i18n.locale = this.lang
    },
    handleBlur() {
      setTimeout(() => {
        this.isOpen = false
      }, 100)
    }
  }
}
</script>

<style scoped>
input {
  padding: 8px 12px;
  margin: 12px;
  border: none;
  border: 1px solid #c3c3c3;
  border-radius: 5px;
  outline: none;
}
button {
  padding: 0 20px;
  height: 40px;
  line-height: 40px;
  border-radius: 5px;
  cursor: pointer;
  color: #fff;
  background-color: #658e81;
  border: none;
  transition: 200ms;
  box-shadow: 0 5px 0 0 #4a7366;
}

button:active {
  transform: translateY(3px);
  box-shadow: 0 2px 0 0 #4a7366;
}
.hello {
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: center;
}
.select-box {
  position: relative;
  width: fit-content;
}
.options {
  width: 100%;
  transform-origin: top;
  transform: scaleY(0);
  position: absolute;
  z-index: 1;
  background-color: #fff;
  left: 0;
  top: 100%;
  box-shadow: 0 0 5px #ccc;
  transition: 100ms;
  border-radius: 5px;
}
.options.open {
  transform: scaleY(1);
}
.option {
  padding: 12px;
  margin: 0;
  cursor: pointer;
}
.option:hover {
  background-color: #f9f9f9;
}
</style>
