<template>
  <input class="input">
</template>

<script>
</script>

<style scoped>
input {
  border: none;
  border-radius: 50px;
  padding: 18px 42px;
  font-size: 22px;
  font-family: "Raleway-600", serif;
  background-color: #F6F5F5;
  width: 575px;
  margin-bottom: 30px;
  &:focus{
    outline: none;
  }
}
@media (max-width: 880px) {
    .input{
        padding: 5px 10px;
        width: 480px;
        height: 40px;
        font-size: 16px;
    }
}
@media (max-width: 640px) {
    .input{
        width: 440px;
        height: 35px;
        font-size: 15px;
    }
}
@media (max-width: 575px) {
    .input{
        padding: 5px 10px;
        width: 310px;
        height: 30px;
        font-size: 14px;
    }
}
</style>
