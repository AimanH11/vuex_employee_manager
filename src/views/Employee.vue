<template>
  <div class="list-employees">
    <div class="container">
     <div style="text-align:center;">
        <h2> <b> Employee Details</b></h2>
       </div>
      <ui-snackbar-container ref="snackbarContainer" ></ui-snackbar-container>
      <ui-confirm
        confirm-button-icon="delete"
        confirm-button-text="Delete"
        deny-button-text="Cancel"
        ref="deleteConfirm"
        title="Delete"
        type="danger"
        @confirm="onConfirmDelete">
        Are you sure you want to delete the employee details?
      </ui-confirm>
      <div class="row mt-3">
        <div class="table-responsive">
          <table class="table table-bordered table-dark table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th> <ui-icon icon="account_circle"></ui-icon> Name</th>
                <th><ui-icon icon="mail"></ui-icon> Email</th>
                <th><ui-icon icon="contact_phone"></ui-icon> Phone</th>
                <th><ui-icon icon="home"></ui-icon> Address</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody v-if="employeeList && employeeList.length > 0">
              <tr v-for="(employee, index) in employeeList" :key="employee.id">
                <td>{{ employeeList.length - index }}</td>
                <td>{{ employee.employee_name }}</td>
                <td>{{ employee.email_id }}</td>
                <td>{{ employee.phone_number }}</td>
                <td>{{ employee.address }}</td>
                 <td>
                  <router-link
                    :to="{
                      name: 'Edit',
                      params: { id: employee.id },
                    }"
                    ><ui-button
                      color="primary"
                      icon="edit"
                      size="normal"
                      tooltip="Edit"
                      tooltip-position="top"
                      @click="isEmployeeEdit = true"
                    >Edit</ui-button>
                  </router-link>

                  <ui-button
                    color="red"
                    icon="delete"
                    size="normal"
                    tooltip="Delete"
                    tooltip-position="top"
                    @click="showConfirm('deleteConfirm', employee.id)"
                  >Delete</ui-button>
                </td>
              </tr>
            </tbody>
            <tbody v-else>
              <tr>
                <td colspan="6">No records found!</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
  },
  data: function () {
    return {
      employeeList: [],
      selectedId: null
    }
  },
  created () {
    this.$store.commit('LOAD_EMPLOYEES')
  },
  mounted () {
    // Accessing the Vuex state
    this.employeeList = this.$store.getters.getEmployee
  },
  methods: {
    showConfirm (ref, id) {
      // get & set selected employee id
      this.selectedId = id
      this.$refs[ref].open()
    },
    onConfirmDelete () {
      // delete data
      this.$store.dispatch('REMOVE_EMPLOYEE', this.selectedId)
      // create snackbar on delete
      this.$refs.snackbarContainer.createSnackbar({
        message: 'Employee details deleted successfully!',
        action: '',
        duration: 5000
      })
    }
  }
}
</script>
