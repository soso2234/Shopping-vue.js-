<template>
  <main class="mt-3">
          <div class="container">
              <h2 class="text-center">제품 사진 등록</h2>
                <div class="mb-3 row">
                    <label class="col-md-3 col-form-label">제품ID</label>
                    <div class="col-md-9">
                        {{productId}}
                    </div>
                </div>
                <div class="mb-3 row">
                    <label class="col-md-3 col-form-label">제품명</label>
                    <div class="col-md-9">
                        {{productDetail.product_name}}
                    </div>
                </div>
                <div class="mb-3 row">
                    <label class="col-md-3 col-form-label">썸네일 이미지</label>
                    <div class="col-md-9">
                        <input class="form-control" type="file" accept="image/png, image/jpeg">
                        <div class="alert alert-secondary" role="alert">
                            <ul>
                                <li>이미지 사이즈 : 350*350</li>
                                <li>파일 사이즈 : 1MB 이하</li>
                                <li>파일 확장자 : png, jpeg만 가능</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="mb-3 row">
                    <label class="col-md-3 col-form-label">제품 이미지</label>
                    <div class="col-md-9">
                        <input class="form-control" type="file" accept="image/png, image/jpeg" multiple>
                        <div class="alert alert-secondary" role="alert">
                            <ul>
                                <li>최대 5개까지 등록 가능</li>
                                <li>이미지 사이즈 : 700*700</li>
                                <li>파일 사이즈 : 1MB 이하</li>
                                <li>파일 확장자 : png, jpeg만 가능</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="mb-3 row">
                    <label class="col-md-3 col-form-label">제품 설명 이미지</label>
                    <div class="col-md-9">
                        <input class="form-control" type="file" accept="image/png, image/jpeg">
                        <div class="alert alert-secondary" role="alert">
                            <ul>
                                <li>파일 사이즈 : 5MB 이하</li>
                                <li>파일 확장자 : png, jpeg만 가능</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="mb-3 row">
                    <div class="col-6 d-grid p-1">
                        <button type="button" class="btn btn-lg btn-dark" @click="goToList">취소</button>
                      </div>
                      <div class="col-6 d-grid p-1">
                        <button type="button" class="btn btn-lg btn-danger">저장</button>
                      </div>
                </div>
          </div>
      </main>
</template>

<script>


export default {
 data() {
     return {
        productId: 0,
        productName: "",
        productDetail: {},
        productImage: []
     };
 },
 computed:{
  user() {
    return this.$store.state.user;
    }
  },
  created() {
    this.productId = this.$route.query.product_id;
    this.getProductDetail();
    this.getProductImage();
  },
  mounted() {
    if(this.user.email == undefined){
      alert("로그인 후 이용 가능합니다.");
      this.$router.push({path:'/'});
    }
  },
  methods: {
      goToList() {
          this.$router.push({path:'/sales'});
      },
      //상세화면
      async getProductDetail() {
          let productDetail = await this.$api("/api/productDetail", {param:[this.productId]});
          if(productDetail.length > 0) {
            this.productDetail = productDetail[0];
          }
      },

      //상세화면 이미지
      async getProductImage() {
          this.productImage = await this.$api("/api/productMainImages", {param:[this.productId]});
      }
  }
}
</script>
