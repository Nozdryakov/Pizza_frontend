<template>
    <form>
        <slot></slot>
    </form>
</template>

<script>
export default {
    name: 'login-form'
}
</script>

<style scoped>
form{
  display: flex;
  flex-direction: column;
    align-items: center;
}
</style>