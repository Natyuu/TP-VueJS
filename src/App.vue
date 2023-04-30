<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
      <theme-switch :is-dark-mode="isDarkMode" @toggle-theme="toggleTheme"></theme-switch>
  </nav>
  <router-view/>
</template>

<script>
import ThemeSwitch from './views/ThemeSwitch.vue';

export default {
    name: "App",
    components: {
        ThemeSwitch,
    },
    data() {
        return {
            isDarkMode: false,
        };
    },
    methods: {
        toggleTheme() {
            this.isDarkMode = !this.isDarkMode;

            if (this.isDarkMode) {
                document.body.classList.add('dark-mode');
            } else {
                document.body.classList.remove('dark-mode');
            }
        },
    },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

/* Styles for dark mode */
.dark-mode {
  background-color: #1a1a1a;
}

.dark-mode body {
  color: whitesmoke;
}

.dark-mode .todos{
  color: whitesmoke;
}

.dark-mode a{
  color: whitesmoke;
}

.dark-mode .about{
  color: whitesmoke;
}
</style>