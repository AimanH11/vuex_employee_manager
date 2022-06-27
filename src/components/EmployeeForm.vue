<template>
 <div class="form-employee">
    <router-link :to= "{ path : '/'}" class="nav-link" > <ui-button
     color="gray"
     icon="arrow_back"
     size="normal"
     raised
     buttonType="button"
     > Back
    </ui-button></router-link>
     <ui-snackbar-container ref="submitSnackbar"></ui-snackbar-container>
    <form
      class="px-3 py-3"
      autocomplete="off"
      method="POST"
      @submit.prevent="isEdit ? onUpdate() : onSubmit()"
    >
      <div class="row mt-5">
        <div class="col-md-6 mt-3">
          <ui-textbox
            floating-label
            md-light
            icon="account_circle"
            label="Employee Name"
            placeholder="Enter employee name"
            type="text"
            data-vv-as="Employee Name"
            name="employee_name"
            v-validate="'required|alpha_spaces|min:3|max:15'"
            v-model="employee.employee_name"
          ></ui-textbox>
          <p class="text-danger" v-if="errors.has('employee_name')">
            {{ errors.first("employee_name") }}
          </p>
        </div>
        <div class="col-md-6 mt-3">
          <ui-textbox
            floating-label
            icon="contact_phone"
            label="Phone Number"
            placeholder="Enter phone number"
            type="tel"
            v-validate="'required|numeric|min:10|max:10'"
            data-vv-as="Phone Number"
            name="phone_number"
            v-model="employee.phone_number"
          ></ui-textbox>
          <p class="text-danger" v-if="errors.has('phone_number')">
            {{ errors.first("phone_number") }}
          </p>
        </div>
      </div>
       <div class="row mt-5">
        <div class="col-md-6 mt-3">
          <ui-textbox
            floating-label
            icon="mail"
            label="Email Id"
            placeholder="Enter email id"
            type="email"
            data-vv-as="Email Id"
            name="email_id"
            v-validate="'required|email|max:150'"
            v-model="employee.email_id"
          ></ui-textbox>
          <p class="text-danger" v-if="errors.has('email_id')">
            {{ errors.first("email_id") }}
          </p>
        </div>
        <div class="col-md-6 mt-3">
          <ui-textbox
            floating-label
            icon="home"
            label="Address"
            placeholder="Enter Address"
            type="text"
            data-vv-as="Address"
            name="address"
            v-validate="'required|alpha_spaces|min:5|max:150'"
            v-model="employee.address"
          ></ui-textbox>
          <p class="text-danger" v-if="errors.has('address')">
            {{ errors.first("address") }}
          </p>
      </div>
      </div>
      <div class="row mt-5">
        <div class="col-md-12">
          <ui-button
            color="primary"
            icon="done"
            size="normal"
            raised
            >{{ isEdit ? "Update" : "Save" }}
          </ui-button>
          <ui-button
            color="red"
            icon="clear"
            size="normal"
            raised
            buttonType="button"
            @click="resetForm"
            >Clear</ui-button
          >
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: ['isEdit'],
  data: function () {
    return {
      employee: {
        id: null,
        employee_name: '',
        phone_number: '',
        email_id: '',
        address: ''
      }
    }
  },
  mounted () {
    if (this.isEdit) {
      this.getParticularData()
    }
  },
  methods: {
    generateUid () {
      let uuid = Math.floor(Math.random() * Date.now())
      return uuid * 100
    },
    resetForm () {
      if (this.isEdit) {
        this.$store.commit('LOAD_EMPLOYEES')
        this.getParticularData()
        return
      }
      // reset form
      this.employee.id = null
      this.employee.employee_name = ''
      this.employee.phone_number = ''
      this.employee.email_id = ''
      this.employee.address = ''
      // reset validation
      this.$validator.pause()
      this.$nextTick(() => {
        this.$validator.errors.clear()
        this.$validator.fields.items.forEach((field) => field.reset())
        this.$validator.fields.items.forEach((field) =>
          this.errors.remove(field)
        )
        this.$validator.resume()
      })
    },
    getParticularData () {
      let empId = this.$route.params.id
      let data = this.$store.state.employees
      this.employee = data.find((element) => element.id === empId)
    },
    createSnackbar () {
      let snackMessage
      if (this.isEdit) {
        snackMessage = 'Employee details updated successfully!'
      } else {
        snackMessage = 'Employee details added successfully!'
      }
      // create snackbar on add/update
      this.$refs.submitSnackbar.createSnackbar({
        message: snackMessage,
        action: 'Click to View',
        duration: 5000,
        actionColor: 'primary',
        onActionClick: () => {
          this.$router.push('/')
        }
      })
    },
    onSubmit () {
      this.$validator.validate().then((isValid) => {
        if (!isValid) {
          return
        }
        let newData = {}
        const form = event.target
        const formData = new FormData(form)
        for (const [key, value] of formData) {
          newData['id'] = this.generateUid()
          newData[key] = value
        }
        this.$store.dispatch('SAVE_EMPLOYEE', newData)
        this.createSnackbar()
        this.resetForm()
      })
    },
    onUpdate () {
      this.$validator.validate().then((isValid) => {
        if (!isValid) {
          return
        }
        let newData = {}
        const form = event.target
        const formData = new FormData(form)
        let empId = this.$route.params.id
        for (const [key, value] of formData) {
          newData['id'] = empId
          newData[key] = value
        }
        this.$store.dispatch('EDIT_EMPLOYEE', newData)
        this.createSnackbar()
      })
    }
  }
}
</script>
