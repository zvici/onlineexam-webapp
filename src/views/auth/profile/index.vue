<template>
  <b-card>
    <div class="cover-img" />
    <div class="avatar-profile">
      <b-avatar
        :src="url + userData.avatar"
        size="8rem"
      />
    </div>
    <p class="full-name">
      {{ userData.fullName }}
    </p>
    <div class="info">
      <b-row>
        <b-col
          cols="12"
          md="6"
        ><div class="item">
          <feather-icon
            icon="MailIcon"
            size="20"
          />
          <p>{{ userData.email }}</p>
        </div>
        </b-col>
        <b-col
          cols="12"
          md="6"
        ><div class="item">
          <feather-icon
            icon="SmartphoneIcon"
            size="20"
          />
          <p>{{ userData.phone }}</p>
        </div>
        </b-col>
        <b-col
          cols="12"
          md="6"
        ><div class="item">
          <feather-icon
            icon="CalendarIcon"
            size="20"
          />
          <p>{{ userData.birthday }}</p>
        </div>
        </b-col>
        <b-col
          cols="12"
          md="6"
        ><div class="item">
          <feather-icon
            icon="ZapIcon"
            size="20"
          />
          <p>{{ userData.gender | filterGender }}</p>
        </div>
        </b-col>
      </b-row>
    </div>
  </b-card>
</template>
<script>
import {
  BCard, BAvatar, BRow, BCol,
} from 'bootstrap-vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    BCard,
    BAvatar,
    BRow,
    BCol,
  },
  filters: {
    filterGender(value) {
      return value ? 'Nam' : 'Nữ'
    },
  },
  data() {
    return {
      url: 'https://examol.herokuapp.com',
    }
  },
  computed: {
    ...mapGetters(['userData']),
  },
}
</script>
<style lang="scss" scoped>
.cover-img {
  height: 250px;
  background-image: url(../../../assets/images/bg/bgcover.jpg);
  background-size: cover;
  background-position: center;
  margin-top: -21px;
  margin-left: -21px;
  margin-right: -21px;
  border-radius: 10px 10px 0px 0px;
}
.avatar-profile {
  text-align: center;
  .b-avatar {
    border: 3px solid white;
    margin-top: -4rem;
  }
}
.full-name {
  padding-top: 10px;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
}
.info {
  display: flex;
  align-items: center;
  justify-content: center;
  .item {
    padding: 2px;
    display: flex;
    padding-left: 20px;
    p {
      margin-left: 5px;
    }
  }
}
</style>
