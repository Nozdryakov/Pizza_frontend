<template>
  <button class="btn">
    <slot></slot>
  </button>
</template>

<script>

</script>

<style scoped>
.btn {
  padding: 15px 80px;
  background: #ff1313;
  color: white;
  font-size: 20px;
  font-weight: 500;
  border-radius: 80px;
  cursor: pointer;
}
.btn:hover{
  text-decoration: none;
}
@media (max-width: 880px) {
    .btn{
        width: 210px;
        height: 50px;
        font-size: 18px;
    }
}
@media (max-width: 640px) {
    .btn{
        width: 190px;
        height: 45px;
        font-size: 16px;
    }
}

</style>
