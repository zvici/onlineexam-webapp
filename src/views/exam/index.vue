<template>
  <div>
    <div v-show="showExam">
      <b-card>
        <h4 class="font-weight-bold">
          Bài thi TOEIC
        </h4>
      </b-card>
      <b-container
        fluid="sm"
        class="d-flex"
      >
        <div class="main-test">
          <b-card>
            <swiper
              ref="questionSwiper"
              :options="swiperOptions"
            >
              <swiper-slide
                v-for="(question, indexQ) in listQuestions"
                :key="question.id"
              >
                <b-form-group
                  :label="`Câu ${indexQ + 1}: ${question.title}`"
                  class="mt-2"
                  label-size="lg"
                >
                  <b-form-radio-group
                    label-size="lg"
                    stacked
                  >
                    <b-form-radio
                      v-for="(item, indexR) in question.answers"
                      :key="indexR"
                      :value="indexR"
                      name="radio-size"
                      size="lg"
                      class="mt-2 text-dark"
                      @change="changQuestion(indexQ, indexR)"
                    >{{ (indexR + 1) | numberToString }}.
                      {{ item.answer }}</b-form-radio>
                  </b-form-radio-group>
                </b-form-group>
              </swiper-slide>
              <div
                slot="pagination"
                class="swiper-pagination"
              />
              <!-- Add Arrows -->
            </swiper>
            <div class="d-flex mt-3">
              <b-button
                slot="button-prev"
                v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                class="prev"
                variant="outline-primary"
              >
                Câu trước
              </b-button>
              <b-button
                slot="button-next"
                v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                class="next ml-1"
                variant="outline-primary"
              >
                Câu tiếp
              </b-button>
            </div>
          </b-card>
        </div>
        <div class="number-question pl-1">
          <b-card>
            <b-button
              v-for="(item, indexB) in listAnswer"
              :key="indexB"
              v-ripple.400="'rgba(113, 102, 240, 0.15)'"
              :variant="item.answer === null ? 'outline-primary' : 'primary'"
              class="col-2 m-1"
              @click.prevent="toSlide(indexB)"
            >
              {{ (indexB + 1) | digitnumber }}
            </b-button>
          </b-card>
        </div>
      </b-container>
    </div>
    <b-modal
      ref="my-modal"
      centered
      title="Thông tin và điều lệ"
      ok-only
      ok-title="Chấp nhận"
    >
      <h1>hihi</h1>
    </b-modal>
  </div>
</template>
<script>
import {
  BCard,
  BFormRadioGroup,
  BFormRadio,
  BFormGroup,
  BContainer,
  BButton,
  BModal,
} from 'bootstrap-vue'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import Ripple from 'vue-ripple-directive'
import schedulesApi from '@/api/schedulesApi'

export default {
  components: {
    BContainer,
    BCard,
    BFormRadioGroup,
    BFormRadio,
    BFormGroup,
    Swiper,
    SwiperSlide,
    BButton,
    BModal,
  },
  directives: {
    Ripple,
  },
  filters: {
    digitnumber(value) {
      if (value < 10) {
        return `0${value}`
      }
      return `${value}`
    },
    numberToString(value) {
      return (value + 9).toString(36).toUpperCase()
    },
  },
  data() {
    return {
      showExam: true,
      listQuestions: [],
      listAnswer: [],
      swiperOptions: {
        navigation: {
          nextEl: '.next',
          prevEl: '.prev',
        },
        allowTouchMove: false,
        pagination: {
          el: '.swiper-pagination',
          type: 'progressbar',
        },
      },
    }
  },
  async created() {
    try {
      const response = await schedulesApi.getSchedulesById(
        this.$route.params.id,
      )
      this.listQuestions = response.data.data.exam.questions
      this.listQuestions.forEach(element => {
        this.listAnswer.push({
          idQuestion: element.id,
          answer: null,
        })
      })
    // eslint-disable-next-line no-empty
    } catch {}
  },
  mounted() {
    this.$refs['my-modal'].show()
  },
  methods: {
    toSlide(index) {
      this.$refs.questionSwiper.$swiper.slideTo(index, 1)
    },
    changQuestion(indexQ, indexR) {
      this.listAnswer[indexQ].answer = indexR
    },
  },
}
</script>
<style lang="scss" scoped>
.choose {
  cursor: pointer;
}
.main-test {
  color: black;
  width: 70%;
  .card {
    height: 100%;
  }
}
.number-question {
  width: 30%;
  .card {
    height: 100%;
  }
}
</style>
