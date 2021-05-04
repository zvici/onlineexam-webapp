<template>
  <div>
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
                    v-for="(item, indexR) in question.response"
                    :key="indexR"
                    :value="indexR"
                    name="radio-size"
                    size="lg"
                    class="mt-2 text-dark"
                    @change="changQuestion(indexQ, indexR)"
                  >{{ (indexR + 1) | numberToString }}.
                    {{ item }}</b-form-radio>
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
</template>
<script>
import {
  BCard,
  BFormRadioGroup,
  BFormRadio,
  BFormGroup,
  BContainer,
  BButton,
} from 'bootstrap-vue'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import Ripple from 'vue-ripple-directive'

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
      listQuestions: [
        {
          id: '1',
          title: 'Bình chữa cháy bằng khí chữa cháy hiệu quả ở khu vực nào?',
          response: [
            'Ngoài trời',
            'Nơi có gió',
            'Nơi kín gió',
            'Tất cả các đáp án trên',
          ],
        },

        {
          id: '2',
          title:
            'Bình chữa cháy bằng bột chữa cháy không hiệu quả đối với đám cháy nào?',
          response: [
            'Chất rắn',
            'Chất lỏng',
            'Chất khí',
            'Các kim loại đang nóng đỏ và thiết bị điện tử',
          ],
        },

        {
          id: '3',
          title: 'Khi có cháy xảy ra do điện, đầu tiên, ta phải làm gì?',
          response: [
            'Báo động cho mọi người xung quanh biết, đồng thời gọi điện thoại thông báo cho lực lượng Cảnh sát PCCC qua số 114',
            'Ngắt cầu dao diện',
            'Nhanh chóng dùng phương tiện chữa cháy tại chỗ để chữa cháy',
            'Tất cả đều đúng',
          ],
        },

        {
          id: '4',
          title: 'Những nguy cơ dễ dẫn đến cháy nổ trong nhà bếp là:',
          response: [
            'Nguy cơ hỏa hoạn do gas',
            'Nguy cơ hỏa hoạn do cháy dầu',
            'Nguy cơ hỏa hoạn do cháy điện',
            'Tất cả các đáp án trên đều đúng',
          ],
        },

        {
          id: '5',
          title: 'Cấu trúc mô hình bếp hiện đại là:',
          response: [
            'Bếp 1 chiều',
            'Bếp 2 chiều',
            'Bếp 3 chiều',
            'Bếp 4 chiều',
          ],
        },

        {
          id: '6',
          title: 'Cách tránh ngộ độc khí trong đám cháy là:',
          response: [
            'Phải ngay lập tức mở tất cả các cửa ở hướng không có cháy để giảm áp suất',
            'Không được mở cửa ở hướng có cháy và khói xông vào phòng',
            'Các phương pháp phòng khói khẩn cấp như khăn ướt luôn có tác dụng tốt vì vậy bạn nên luôn để 1 chai nước trong phòng',
            'Tất cả các phương án trên đều đúng',
          ],
        },

        {
          id: '7',
          title: 'Ý nghĩa của sơ đồ bếp trong bộ phận bếp là:',
          response: [
            'Tránh lây nhiễm chéo',
            'Kiểm soát vệ sinh an toàn thực phẩm',
            'Kiểm sóat nguyên liệu nhập vào và thành phẩm đầu ra',
            'Tất cả các đáp án trên đều đúng',
          ],
        },

        {
          id: '8',
          title:
            'Khi bị cháy ở nhà cao tầng, anh/chị sẽ thoát nạn như thế nào?',
          response: [
            'Chạy lên',
            'Đi bằng thang máy',
            'Chạy xuống bằng cầu thang bộ theo biển chỉ dẫn thoát nạn trong tòa nhà',
            'Ở trong phòng đóng kín cửa lại',
          ],
        },

        {
          id: '9',
          title: 'Bình chữa cháy có ký hiệu MT3 là bình chữa cháy loại gì?',
          response: [
            'Loại bột 3kg',
            'Loại khí 3kg',
            'Loại bột 5kg',
            'Loại khí 5kg',
          ],
        },

        {
          id: '10',
          title: 'Bình chữa cháy có ký hiệu MFZ3 là bình chữa cháy loại gì?',
          response: [
            'Loại bột 3kg',
            'Loại khí 3kg',
            'Loại bột 5kg',
            'Loại khí 5kg',
          ],
        },

        {
          id: '11',
          title: 'Bình chữa cháy có ký hiệu MT5 là bình chữa cháy loại gì?',
          response: [
            'Loại bột 3kg',
            'Loại khí 3kg',
            'Loại bột 5kg',
            'Loại khí 5kg',
          ],
        },

        {
          id: '12',
          title: 'Các chất cần được kiểm soát trong an ninh khách sạn là:',
          response: [
            'Các loại dược phẩm gây nghiện',
            'Các chất gây nghiện nhẹ',
            'Các chất gây nghiện mạnh',
            'Tất cả các đáp án trên đều đúng',
          ],
        },

        {
          id: '13',
          title:
            'Nguồn năng lượng chủ yếu được sử dụng trong bộ phận bếp của các nhà hàng là',
          response: [
            'Gas và nhiệt',
            'Gas và dầu',
            'Gas và điện',
            'Điện và than',
          ],
        },

        {
          id: '14',
          title: 'Bình chữa cháy có ký hiệu MFZ5 là bình chữa cháy loại gì?',
          response: [
            'Loại bột 3kg',
            'Loại khí 3kg',
            'Loại bột 5kg',
            'Loại khí 5kg',
          ],
        },

        {
          id: '15',
          title:
            'Nhà Văn phòng, khách sạn, Nhà nghỉ cao 5 tầng có thuộc diện phải thẩm duyệt về PCCC?',
          response: [
            'Có',
            'Không',
            'Không có trong quy định nào; tùy nhu cầu của Văn phòng, khách sạn, Nhà nghỉ',
            'Chỉ có khách sạn, Nhà nghỉ là thuộc diện phải thẩm duyệt về PCCC',
          ],
        },
      ],
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
  created() {
    this.listQuestions.forEach(element => {
      this.listAnswer.push({
        idQuestion: element.id,
        answer: null,
      })
    })
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
