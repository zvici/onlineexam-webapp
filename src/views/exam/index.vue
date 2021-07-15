<template>
  <b-overlay
    :show="show"
    rounded="sm"
    spinner-variant="primary"
    class="overlay-page"
  >
    <div
      v-if="currentQuestion"
      class="exam-page"
    >
      <div class="main">
        <!-- Start: Title -->
        <div class="title">
          <p>{{ nameExam }}</p>
        </div>
        <!-- Start: Body -->
        <div class="body">
          <b-form-group
            :label="`Câu ${selectedQuestion + 1}: ${currentQuestion.title}`"
          >
            <b-form-radio-group
              id="radio-group-question"
              v-model="currentQuestion.answer"
              :options="currentQuestion.questions"
              text-field="text"
              value-field="id"
              name="radio-options"
              stacked
              @change="onChangeAnswer"
            />
          </b-form-group>
        </div>
        <!-- Start: Footer -->
        <div class="footer-exam">
          <div class="footer-control">
            <div class="button-control">
              <div>
                <b-button
                  v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                  variant="dark"
                  class="review"
                  @click="onMaskReview"
                >
                  Đánh dấu xem lại
                </b-button>
                <b-button
                  v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                  variant="danger"
                  class="previous"
                  :disabled="disablePrevious"
                  @click="onPreviousQuestion"
                >
                  Câu trước
                </b-button>
                <b-button
                  v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                  variant="danger"
                  class="next"
                  :disabled="disableNext"
                  @click="onNextQuestion"
                >
                  Câu tiếp
                </b-button>
              </div>
              <b-button
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                variant="primary"
                @click="onSubmitAnswer"
              >
                Nộp bài
              </b-button>
            </div>
            <div class="sub">
              <mask-sub
                color="#0468BF"
                title="Câu hiện tại"
              />
              <mask-sub
                color="#00C58E"
                title="Đã trả lời"
              />
              <mask-sub
                color="#DA7B03"
                title="Chưa trả lời"
              />
              <mask-sub
                color="#454545"
                title="Xem lại"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="control">
        <div class="time-left">
          <div class="title">
            <p>Thời gian làm bài</p>
          </div>
          <div class="count">
            <div class="item">
              <div class="num">
                {{ timeLeft.minutes }}
              </div>
              <div>phút</div>
            </div>
            <div class="item">
              <div class="num">
                {{ timeLeft.seconds }}
              </div>
              <div>giây</div>
            </div>
          </div>
        </div>
        <div class="verbal">
          <div class="title">
            <p>Bảng câu hỏi</p>
          </div>
          <div class="verbal-area">
            <square-question
              v-for="item in listAnswer.answers"
              :key="item.id"
              :num="item.num"
              :status="item.status"
              :selectq="selectedQuestion"
              @changeQuestion="changeSlectedQuestion"
            />
          </div>
        </div>
      </div>
    </div>
    <b-modal
      ref="my-modal"
      hide-footer
      title="Thông báo"
      centered
    >
      <b-overlay
        :show="show"
        rounded="sm"
        spinner-variant="primary"
      >
        <div class="d-block text-center p-5">
          <h3>Bạn muốn nộp bài chứ?</h3>
        </div>
        <div class="d-flex justify-content-end">
          <b-button
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            variant="primary"
            @click="onSentAnswer"
          >
            Nộp bài
          </b-button>
          <b-button
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            variant="danger"
            class="ml-1"
            @click="hideModal"
          >
            Đóng
          </b-button>
        </div>
      </b-overlay>
    </b-modal>
  </b-overlay>
</template>
<script>
import {
  BButton,
  BFormGroup,
  BFormRadioGroup,
  BOverlay,
  BModal,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import MaskSub from '@/components/Mask/MaskSub.vue'
import schedulesApi from '@/api/schedulesApi'
import SquareQuestion from '@/components/SquareQuestion/SquareQuestion.vue'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import { mapGetters } from 'vuex'
import resultApi from '@/api/resultApi'

export default {
  components: {
    BButton,
    MaskSub,
    BFormGroup,
    BFormRadioGroup,
    BOverlay,
    SquareQuestion,
    BModal,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      show: true,
      nameExam: '',
      totalQuestion: 0,
      selectedQuestion: 0,
      listAnswer: {
        id: this.$route.params.id,
        answers: [],
      },
      timeLeft: {
        minutes: 0,
        seconds: 0,
      },
    }
  },
  computed: {
    currentQuestion() {
      if (this.listAnswer) {
        return this.listAnswer.answers[this.selectedQuestion]
      }
      return null
    },
    disableNext() {
      if (this.selectedQuestion === this.totalQuestion - 1) return true
      return false
    },
    disablePrevious() {
      if (this.selectedQuestion === 0) return true
      return false
    },
    ...mapGetters([
      'userData',
    ]),
  },
  async created() {
    try {
      const response = await schedulesApi.getSchedulesById(
        this.$route.params.id,
      )
      this.totalQuestion = response.data.data.exam.questions.length
      this.nameExam = response.data.data.exam.name
      response.data.data.exam.questions.forEach((element, index) => this.listAnswer.answers.push({
        num: index + 1,
        // eslint-disable-next-line no-underscore-dangle
        id: element._id,
        status: 2,
        answer: null,
        questions: element.answers.map((item, idx) => ({
          text: item.answer,
          value: idx + 1,
          // eslint-disable-next-line no-underscore-dangle
          id: `${index}&&&${idx + 1}`,
        })),
        title: element.title,
      }))
      this.startTimeLeft(response.data.data.time)
    } catch (err) {
      // eslint-disable-next-line no-alert
      alert(err)
      this.$router.push({ name: 'error-404' })
    } finally {
      this.show = false
    }
  },
  methods: {
    startTimeLeft(num) {
      const diff = num
      this.timeLeft.minutes = diff
      this.timeLeft.seconds = 0
      const a = setInterval(() => {
        if (this.timeLeft.minutes === 5 && this.timeLeft.seconds === 0) {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Thông báo',
              icon: 'BellIcon',
              text: 'Bạn còn 5 phút làm bài',
              variant: 'warning',
            },
          })
        }
        if (this.timeLeft.seconds === 0) {
          this.timeLeft.minutes -= 1
          this.timeLeft.seconds = 59
        } else {
          this.timeLeft.seconds -= 1
        }
        if (this.timeLeft.minutes === 0 && this.timeLeft.seconds === 0) {
          clearInterval(a)
          this.onSentAnswer()
        }
      }, 1000)
    },
    onChangeAnswer(value) {
      // eslint-disable-next-line radix
      const nuQ = parseInt(value.split('&&&')[0])
      this.listAnswer.answers[nuQ].status = 1
    },
    changeSlectedQuestion(num) {
      this.selectedQuestion = num - 1
    },
    onNextQuestion() {
      this.selectedQuestion += 1
    },
    onPreviousQuestion() {
      this.selectedQuestion -= 1
    },
    onMaskReview() {
      this.listAnswer.answers[this.selectedQuestion].status = 3
    },
    hideModal() {
      this.$refs['my-modal'].hide()
    },
    onSubmitAnswer() {
      this.$refs['my-modal'].show()
    },
    async onSentAnswer() {
      const dataSend = {
        // eslint-disable-next-line no-underscore-dangle
        userID: this.userData._id,
        scheduleId: this.listAnswer.id,
        answers: this.listAnswer.answers.map(element => ({
          id: element.id,
          // eslint-disable-next-line radix
          answer: element.answer ? parseInt(element.answer.split('&&&')[1]) : null,
        })),
      }
      this.show = true
      try {
        await resultApi.addResult(dataSend)
        this.$swal({
          title: 'Nộp bài thành công!',
          text: 'Bạn có thể kiếm tra kết quả của mình ở phần kết quả thi!',
          icon: 'success',
          customClass: {
            confirmButton: 'btn btn-primary',
          },
          buttonsStyling: false,
        }).then(() => {
          this.$router.push({ name: 'Home' })
          this.$router.go()
        })
      } catch (err) {
        this.$swal({
          title: 'Lỗi!',
          text: 'Bạn có thể thử lại bằng cách nhấn nút nộp bài!',
          icon: 'error',
          customClass: {
            confirmButton: 'btn btn-primary',
          },
          buttonsStyling: false,
        })
      } finally {
        this.show = false
      }
    },
  },
}
</script>
<style lang="scss">
.exam-page {
  width: 100%;
  height: 100vh;
  display: flex;
  .main {
    width: 70%;
    position: relative;
    .title {
      width: 100%;
      height: 60px;
      background-color: #e7e7e7;
      display: flex;
      justify-content: center;
      align-items: center;
      p {
        color: #363844;
        font-size: 20px;
        font-weight: bold;
        margin: 0;
      }
    }
    .body {
      flex: 1;
      padding: 40px;
      padding-top: 80px;
      padding-bottom: 120px;
      font-size: 20px;
      .custom-control-label {
        font-size: 15px;
      }
      .custom-radio {
        margin: 15px 0;
      }
    }
    .footer-exam {
      position: absolute;
      bottom: 0;
      height: 120px;
      width: 100%;
      background-color: #e7e7e7;
      .button-control {
        padding: 0px 10px;
        height: 60px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .review {
          display: inline;
        }
        .previous {
          border-radius: 20px 0px 0px 20px;
          margin-left: 10px;
          width: 110px;
        }
        .next {
          border-radius: 0px 20px 20px 0px;
          margin-left: 10px;
          width: 110px;
        }
      }
      .sub {
        height: 60px;
        border-top: 1px solid #363844;
        width: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
      }
    }
  }
  .control {
    border-left: 1px solid #363844;
    width: 30%;
    .time-left {
      .title {
        width: 100%;
        height: 60px;
        background-color: #e7e7e7;
        display: flex;
        justify-content: center;
        align-items: center;
        p {
          color: #363844;
          font-size: 20px;
          font-weight: bold;
          margin: 0;
        }
      }
      .count {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        padding: 20px;
        .item {
          font-size: 18px;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 10px;
          .num {
            font-weight: bold;
            font-size: 20px;
          }
        }
      }
    }
    .verbal {
      .title {
        width: 100%;
        height: 60px;
        background-color: #e7e7e7;
        display: flex;
        justify-content: center;
        align-items: center;
        p {
          color: #363844;
          font-size: 20px;
          font-weight: bold;
          margin: 0;
        }
      }
      .verbal-area {
        padding: 20px;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(50px, 1fr));
      }
    }
  }
}
.overlay-page {
  width: 100%;
  height: 100vh;
}
@media screen and (max-width: 800px) {
  .exam-page {
    .main {
      width: 100% !important;
      .footer-exam {
        .review {
          display: none !important;
        }
        .sub {
          display: none;
        }
      }
    }
    .control {
      display: none;
    }
  }
}
</style>
