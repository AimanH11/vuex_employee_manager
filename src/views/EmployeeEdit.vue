<template>
  <div class="container">
      <div style="text-align:center">
        <h4> <b>Update Employee Details</b></h4>
      <employee-form :isEdit="isEdit"> </employee-form>
    </div>
    </div>
</template>

<script>

import EmployeeForm from '@/components/EmployeeForm.vue'
export default {
  components: {
    EmployeeForm
  },
  data () {
    return {
      isEdit: true
    }
  }
}
</script>
