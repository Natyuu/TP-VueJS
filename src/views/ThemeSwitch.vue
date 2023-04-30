<template>
    <div class="theme-switch">
        <span class="theme-switch__text">{{ isDarkMode ? 'Dark Mode' : 'Light Mode' }}</span>
        <label for="theme-toggle" class="theme-switch__label">
            <input type="checkbox" id="theme-toggle" class="theme-switch__input" v-model="isDarkMode" @change="toggleTheme" />
            <span class="theme-switch__slider"></span>
        </label>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isDarkMode: false
        };
    },
    methods: {
        toggleTheme() {
            this.$emit('toggle-theme', this.isDarkMode);
            document.body.classList.toggle('dark-mode', this.isDarkMode);
        }
    }
}
</script>

<style scoped>
.theme-switch {
    display: flex;
    align-items: center;
    justify-content: flex-end;
}

.theme-switch__label {
    position: relative;
    display: inline-block;
    width: 50px;
    height: 24px;
}

.theme-switch__input {
    display: none;
}

.theme-switch__slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: .4s;
    border-radius: 34px;
}

.theme-switch__slider:before {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: .4s;
    border-radius: 50%;
}

.theme-switch__input:checked + .theme-switch__slider {
    background-color: #42b983;
}

.theme-switch__input:checked + .theme-switch__slider:before {
    transform: translateX(26px);
}

.theme-switch__text {
    margin-right: 10px;
    font-size: 15px;
}

.dark-mode .theme-switch__text {
    color: whitesmoke;
}

</style>
