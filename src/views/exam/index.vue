<template>
  <b-overlay
    :show="show"
    rounded="sm"
    spinner-variant="primary"
  >
    <div class="exam-page">
      <div class="main">
        <!-- Start: Title -->
        <div class="title">
          <p>{{ nameExam }}</p>
        </div>
        <!-- Start: Body -->
        <div class="body">
          <b-form-group
            v-if="currentQuestion"
            v-slot="{ ariaDescribedby }"
            :label="currentQuestion.title"
          >
            <b-form-radio-group
              id="radio-group-1"
              :options="currentQuestion.answers"
              text-field="answer"
              value-field="_id"
              :aria-describedby="ariaDescribedby"
              name="radio-options"
              stacked
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
                00
              </div>
              <div>house</div>
            </div>
            <div class="item">
              <div class="num">
                42
              </div>
              <div>minutes</div>
            </div>
            <div class="item">
              <div class="num">
                39
              </div>
              <div>second</div>
            </div>
          </div>
        </div>
        <div class="verbal">
          <div class="title">
            <p>Bảng câu hỏi</p>
          </div>
        </div>
      </div>
    </div>
  </b-overlay>
</template>
<script>
import {
  BButton, BFormGroup, BFormRadioGroup, BOverlay,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import MaskSub from '@/components/Mask/MaskSub.vue'
import schedulesApi from '@/api/schedulesApi'

export default {
  components: {
    BButton,
    MaskSub,
    BFormGroup,
    BFormRadioGroup,
    BOverlay,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      show: true,
      listQuestions: {},
      nameExam: '',
      totalQuestion: 0,
      selectedQuestion: 0,
    }
  },
  computed: {
    currentQuestion() {
      if (this.listQuestions) {
        return this.listQuestions[this.selectedQuestion]
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
  },
  async created() {
    try {
      const response = await schedulesApi.getSchedulesById(
        this.$route.params.id,
      )
      this.listQuestions = response.data.data.exam.questions
      this.totalQuestion = response.data.data.exam.questions.length
      this.nameExam = response.data.data.exam.name
    } catch (err) {
      // eslint-disable-next-line no-alert
      alert(err)
    } finally {
      this.show = false
    }
  },
  methods: {
    onNextQuestion() {
      this.selectedQuestion += 1
    },
    onPreviousQuestion() {
      this.selectedQuestion -= 1
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
      padding: 40px;
      padding-top: 80px;
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
    }
  }
}
</style>
