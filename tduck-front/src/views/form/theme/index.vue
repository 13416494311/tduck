<template>
  <div class="theme-container">
    <div class="left-container">
      <el-scrollbar class="left-scrollbar-container">
        <el-button style="margin-bottom: 20px" type="primary" @click="openDialogHandle">上 传</el-button>
        <p class="theme-title">外观主题</p>
        <el-row>
          <el-col :span="3">
            <span class="theme-prompt-text">风格</span>
          </el-col>
          <el-col
            v-for="item in styleList"
            :key="item.key" :span="3"
          >
                        <span
                          :class="{'style-btn-active':activeStyle==item.key}"
                          class="style-btn" @click="activeStyleHandle(item)"
                        >{{ item.label }}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="3">
            <span class="theme-prompt-text">颜色</span>
          </el-col>
          <el-col :span="3">
                        <span
                          :class="{'style-btn-active':activeColor==''}"
                          class="style-btn" @click="activeColorHandle('')"
                        >全部</span>
          </el-col>
          <el-col
            v-for="c in colorList"
            :key="c" :class="{'style-btn-active':activeColor==c}"
            :span="3"
            :style="{backgroundColor: c}"
            class="color-btn" @click.native="activeColorHandle(c)"
          />
        </el-row>
        <el-row>
          <el-col
            v-for="t in themeList"
            :key="t.id"
            :span="8" class="theme-img-view"
            @click.native="activeThemeHandle(t)"
          >
            <p :class="{'head-list-view-select':activeTheme.id==t.id}">
              <el-image
                :class="{'head-list-img-active':activeTheme.id==t.id}"
                :src="t.headImgUrl"
                class="head-list-img"
                fit="cover"
                style="width: 100px; height: 100px;"
              />
            </p>
          </el-col>
        </el-row>

      </el-scrollbar>
    </div>
    <pre-view :key="projectFormKey" :project-key="projectKey" />
    <div class="right-container">
      <p class="right-title">外观设置</p>
      <el-row align="middle" class="option-line-view" type="flex">
        <el-col :span="8">
          <span class="option-line-title">添加logo</span>
        </el-col>
        <el-col :offset="8" :span="8">
          <el-switch
            v-model="showSettings.logoSetting"
          />
        </el-col>
      </el-row>
      <el-row v-if="showSettings.logoSetting" align="middle" type="flex">
        <el-col :span="6">
          <span class="option-line-sub-title">logo设置</span>
        </el-col>
        <el-col :span="4">
          <img
            v-if="userProjectTheme.logoImg"
            :src="userProjectTheme.logoImg"
            style="width: 30px; height: 30px;"
          >
        </el-col>
        <el-col :offset="6" :span="8">
          <el-upload
            ref="logoUpload"
            :action="getUploadUrl"
            :headers="getUploadHeader"
            :on-success="uploadLogoHandle"
            :show-file-list="false"
            accept=".jpg,.jpeg,.png,.gif,.bmp,.JPG,.JPEG,.PBG,.GIF,.BMP"
          >
            <el-button slot="trigger" size="small" type="text">上传Logo</el-button>
          </el-upload>
        </el-col>
      </el-row>
      <el-row v-if="showSettings.logoSetting" align="middle" type="flex">
        <el-col :span="6">
          <span class="option-line-sub-title">logo位置</span>
        </el-col>
        <el-col :span="18">
          <el-radio-group
            v-model="userProjectTheme.logoPosition"
            size="mini" @change="saveUserTheme"
          >
            <el-radio-button label="left">左对齐</el-radio-button>
            <el-radio-button label="center">居中</el-radio-button>
            <el-radio-button label="right">右对齐</el-radio-button>
          </el-radio-group>
        </el-col>
      </el-row>
      <el-row align="middle" class="option-line-view" type="flex">
        <el-col :span="8">
          <span class="option-line-title">背景设置</span>
        </el-col>
        <el-col :offset="8" :span="8">
          <el-switch
            v-model="showSettings.backgroundSetting"
            @change="()=>{
                            this.userProjectTheme.backgroundImg=''
                            this.userProjectTheme.backgroundColor=''
                            this.saveUserTheme()
                        }"
          />
        </el-col>
      </el-row>
      <el-row v-if="showSettings.backgroundSetting">
        <el-row align="middle" type="flex">
          <el-col :span="8">
            <span class="option-line-sub-title">背景类型</span>
          </el-col>
          <el-col :spvan="18">
            <el-radio-group
              v-model="showSettings.backgroundType"
              size="mini" @change="()=>{
                                this.userProjectTheme.backgroundImg=''
                                this.userProjectTheme.backgroundColor=''
                            }"
            >
              <el-radio-button label="color">颜色</el-radio-button>
              <el-radio-button label="img">图片</el-radio-button>
            </el-radio-group>
          </el-col>
        </el-row>
      </el-row>
      <el-row v-if="showSettings.backgroundSetting&&showSettings.backgroundType=='color'">
        <el-row align="middle" type="flex">
          <el-col :span="8">
            <span class="option-line-sub-title">选择颜色</span>
          </el-col>
          <el-col :spvan="18">
            <el-color-picker
              v-model=" userProjectTheme.backgroundColor"
              size="mini"
              @change="saveUserTheme"
            />
          </el-col>
        </el-row>
      </el-row>
      <el-row v-if="showSettings.backgroundType=='img'">
        <el-row align="middle" type="flex">
          <el-col :span="8">
            <span class="option-line-sub-title">选择图片</span>
          </el-col>
          <el-col :spvan="18">
            <el-upload
              ref="upload"
              :action="getUploadUrl"
              :headers="getUploadHeader"
              :on-success="uploadBackgroundHandle"
              :show-file-list="false"
              accept=".jpg,.jpeg,.png,.gif,.bmp,.JPG,.JPEG,.PBG,.GIF,.BMP"
              class="upload-demo"
            >
              <el-button slot="trigger" size="small" type="text">上传背景</el-button>
            </el-upload>
          </el-col>
        </el-row>
      </el-row>
      <el-row align="middle" class="option-line-view" type="flex">
        <el-col :span="8">
          <span class="option-line-title">按钮设置</span>
        </el-col>
        <el-col :offset="8" :span="8">
          <el-switch
            v-model="showSettings.btnSetting"
          />
        </el-col>
      </el-row>
      <el-row v-if="showSettings.btnSetting">
        <el-row align="middle" type="flex">
          <el-col :span="12">
            <span class="option-line-sub-title">按钮提示文字</span>
          </el-col>
          <el-col :spvan="10">
            <el-input v-model="userProjectTheme.submitBtnText"
                      placeholder="请输入内容"
                      size="mini"
                      style="width: 80%;" @change="saveUserTheme"
            />
          </el-col>
        </el-row>
      </el-row>
      <el-row align="middle" class="option-line-view" type="flex">
        <el-col :span="8">
          <span class="option-line-title">显示标题</span>
        </el-col>
        <el-col :offset="8" :span="8">
          <el-switch
            v-model="userProjectTheme.showTitle"
            @change="saveUserTheme"
          />
        </el-col>
      </el-row>
      <el-row align="middle" class="option-line-view" type="flex">
        <el-col :span="8">
          <span class="option-line-title">显示描述</span>
        </el-col>
        <el-col :offset="8" :span="8">
          <el-switch
            v-model="userProjectTheme.showDescribe"
            @change="saveUserTheme"
          />
        </el-col>
      </el-row>
      <el-row align="middle" class="option-line-view" type="flex">
        <el-col :span="8">
          <span class="option-line-title">显示序号</span>
        </el-col>
        <el-col :offset="8" :span="8">
          <el-switch
            v-model="userProjectTheme.showNumber"
            @change="saveUserTheme"
          />
        </el-col>
      </el-row>
    </div>

    <el-dialog :visible.sync="open" title="新增外观主题">
      <el-form ref="form" :model="themeValidateForm"  :rules="rules"  label-width="80px">
        <el-form-item label="主题名称" prop="name">
          <el-input v-model="themeValidateForm.name" placeholder="请输入主题名称"/>
        </el-form-item>
        <el-form-item label="按钮颜色" prop="btnsColor">
          <el-color-picker v-model="themeValidateForm.btnsColor"></el-color-picker>
        </el-form-item>
        <el-form-item label="主题风格" prop="style">
          <el-checkbox-group v-model="themeValidateForm.style">
            <el-checkbox v-for="(item,index) in styleList" :label="item.key"
                                v-if="item.key != 'all'"
                                :key="item.key" style="margin-right: 10px">{{item.label}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="颜色风格" prop="color">
          <el-checkbox-group v-model="themeValidateForm.color">
            <el-checkbox v-for="color in colorList" :label="color"
                                :key="color" :style="{backgroundColor: color}"
                                ></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="头部图片" prop="headImgUrl">
          <el-checkbox-group v-model="themeValidateForm.headImgUrl">
            <el-upload
              ref="upload"
              list-type="picture-card"
              :limit='1'
              :action="getUploadUrl"
              :headers="getUploadHeader"
              :on-success="uploadHeadImgHandle"
              :on-exceed="uploadHeadImgHandleExceed"
              :show-file-list="true"
              accept=".jpg,.jpeg,.png,.gif,.bmp,.JPG,.JPEG,.PBG,.GIF,.BMP"
              class="upload-demo"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
                <el-button @click="open = false">取 消</el-button>
                <el-button type="primary" @click="validateCodeHandle">确 定</el-button>
            </span>
    </el-dialog>
  </div>
</template>

<script>
  import PreView from '../preview'

  export default {
    name: 'Theme',
    components: {
      PreView
    },
    data() {
      return {
        open: false,
        // 外观设置
        showSettings: {
          logoSetting: false, // 打开logo
          backgroundSetting: false,
          btnSetting: false,
          backgroundType: 'color'
        },
        // 用户主题设置
        userProjectTheme: {
          projectKey: '',
          themeId: '',
          showTitle: true,
          showDescribe: true,
          showNumber: false,
          backgroundColor: '',
          backgroundImg: '',
          logoImg: '',
          logoPosition: 'left',
          submitBtnText: '提交'
        },
        projectFormKey: +new Date(),
        projectKey: '',
        styleList: [
          {'label': '全部', 'key': 'all'},
          {'label': '节日', 'key': 'festival'},
          {'label': '亲子', 'key': 'parent_child'},
          {'label': '风景', 'key': 'scenery'},
          {'label': '职业', 'key': 'occupation'},
          {'label': '校园', 'key': 'school'},
          {'label': '商务', 'key': 'commerce'},
          {'label': '其他', 'key': 'others'},
          {'label': '餐饮', 'key': 'catering'},
          {'label': '防疫', 'key': 'fangyi'}
        ],
        colorList: [
          '#FF6D56',
          '#F8E71C',
          '#00BF6F',
          '#2672FF ',
          '#7464FF',
          '#484848',
          '#EAEAEA',
          '#804000'
        ],
        activeColor: '',
        activeStyle: '',
        activeTheme: '',
        themeList: [],
        themeValidateForm: {
          name: '',
          btnsColor: '#409EFF',
          style:[],
          color:[],
          headImgUrl:''
        },
        rules: {
          name: [
            {required: true, trigger: 'blur', message: '请输入主题名称'},
          ],
          btnsColor: {required: true, trigger: 'blur', message: '请选择按钮颜色'},
          style: {required: true, trigger: 'blur', message: '请输入主题风格'},
          color: {required: true, trigger: 'blur', message: '请输入颜色风格'},
        }
      }
    },
    computed: {
      getUploadHeader() {
        return {
          'token': this.$store.getters['user/isLogin']
        }
      },
      getUploadUrl() {
        return `${process.env.VUE_APP_API_ROOT}/user/file/upload`
      }
    },
    mounted() {
      this.projectKey = this.$route.query.key
      this.queryProjectTheme()
      this.projectFormKey = +new Date()
      this.queryUserProjectTheme()
    },
    methods: {
      uploadHeadImgHandleExceed(response){
        this.msgError('只能上传一张图片，请先删除再上传！')
      },
      uploadHeadImgHandle(response) {
        this.themeValidateForm.headImgUrl = response.data;
        this.msgSuccess('操作成功')
      },
      openDialogHandle() {
        this.open = true
        this.themeValidateForm = {
          name: '',
          btnsColor: '#409EFF',
          style:[],
          color:[],
          headImgUrl:''
        }
      },
      validateCodeHandle() {
        this.$refs['form'].validate(valid => {
          if (valid) {
            // 调接口 验证成功
            this.$api.post('/project/theme/save', this.themeValidateForm).then(res => {
              this.open = false
              this.queryProjectTheme()
              this.msgSuccess('操作成功')
            })
          } else {
            return false
          }
        })
      },
      uploadBackgroundHandle(response) {
        this.userProjectTheme.backgroundImg = response.data
        this.userProjectTheme.backgroundColor = ''
        this.saveUserTheme()
      },
      uploadLogoHandle(response) {
        this.userProjectTheme.logoImg = response.data
        this.saveUserTheme()
      },
      activeStyleHandle(item) {
        this.activeStyle = item.key
        this.queryProjectTheme()
      },
      saveUserTheme() {
        this.userProjectTheme.projectKey = this.projectKey
        this.userProjectTheme.themeId = this.activeTheme ? this.activeTheme.id : ''
        this.$api.post('/user/project/theme/save', this.userProjectTheme).then(() => {
          this.projectFormKey = +new Date()
        })
      },
      queryUserProjectTheme() {
        this.$api.get(`/user/project/theme/${this.projectKey}`).then(res => {
          if (!res.data) {
            return
          }
          this.userProjectTheme = res.data
          let {themeId, logoImg, backgroundImg, backgroundColor, submitBtnText} = res.data
          this.activeTheme = {
            'id': themeId
          }
          this.showSettings.logoSetting = !!logoImg
          this.showSettings.btnSetting = !!submitBtnText
          if (backgroundImg || backgroundColor) {
            this.showSettings.backgroundSetting = true
            this.showSettings.backgroundType = backgroundImg ? 'img' : 'color'
          }

        })
      },
      activeThemeHandle(item) {
        if (item) {
          this.$confirm('切换主题，系统将不会保存您在上一主题所做的修改，请知悉。', '切换主题提醒', {
            confirmButtonText: '确定',
            cancelButtonText: '取消操作',
            type: 'info'
          }).then(() => {
            this.activeTheme = item
            this.saveUserTheme()
          }).catch(() => {

          })
        }
      },
      activeColorHandle(item) {
        console.log(item)
        this.activeColor = item
        this.queryProjectTheme()
      },
      queryProjectTheme() {
        this.$api.get('/project/theme/list', {
          params: {
            'color': this.activeColor,
            'style': this.activeStyle
          }
        }).then(res => {
          this.themeList = res.data
        })
      }
    }
  }
</script>

<style scoped>
  .theme-container {
    width: 100%;
    height: 100%;
    background-color: #f7f7f7;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    box-sizing: border-box;
    justify-content: center;
  }
  .left-container {
    line-height: 20px;
    text-align: center;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 100);
    background-color: white;
    width: 20%;
    height: calc(100vh - 60px);
  }
  .left-scrollbar-container {
    height: 100%;
    margin: 20px;
  }
  ::v-deep .el-scrollbar__wrap {
    overflow-x: hidden !important;
  }
  .style-btn {
    line-height: 30px;
    border-radius: 4px;
    padding: 3px;
    color: #707070;
    font-size: 14px;
    text-align: center;
    border: 1px solid #eaeaea;
  }
  .preview-container {
    width: 70%;
  }
  .theme-title {
    color: rgba(16, 16, 16, 100);
    font-size: 24px;
    text-align: left;
  }
  .theme-prompt-text {
    color: rgba(16, 16, 16, 100);
    font-size: 16px;
    line-height: 30px;
    text-align: left;
  }
  .color-btn {
    width: 40px;
    height: 22px;
    line-height: 20px;
    border-radius: 4px;
    background-color: rgba(11, 141, 213, 100);
    color: rgba(16, 16, 16, 100);
    font-size: 14px;
    text-align: center;
    margin: 3px;
    border: 1px solid rgba(255, 255, 255, 100);
  }
  .color-btn:hover,
  .style-btn:hover {
    cursor: pointer;
    border: 1px solid rgba(11, 141, 213, 100);
  }
  .style-btn-active {
    border: 1px solid rgba(11, 141, 213, 100);
  }
  .head-list-img {
    border: 2px solid transparent;
  }
  .head-list-img:hover {
    cursor: pointer;
    border: 2px solid rgba(11, 141, 213, 100);
  }
  .head-list-img-active {
    border: 2px solid rgba(11, 141, 213, 100);
  }
  .theme-img-view .head-list-view-select ::after {
    content: "";
    background: url('~@/assets/images/mobile_theme_active.png');
    background-size: 18px;
    width: 18px;
    height: 18px;
    position: absolute;
    top: 4px;
    right: 4px;
  }
  .right-container {
    width: 310px;
    height: calc(100vh - 60px);
    line-height: 20px;
    text-align: center;
    padding: 22px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 100);
    background-color: white;
    margin-right: 5px;
  }
  .right-title {
    color: rgba(16, 16, 16, 100);
    font-size: 24px;
    text-align: left;
    margin: 0 0 30px 0;
  }
  .right-container .option-line-view {
    padding: 0;
    width: 280px;
    height: 42px;
    line-height: 20px;
    border-radius: 5px;
    text-align: center;
    margin-bottom: 10px;
    border: 1px solid rgba(187, 187, 187, 100);
  }
  .right-container .option-line-title {
    color: rgba(16, 16, 16, 100);
    line-height: 40px;
    font-size: 14px;
    text-align: left;
  }
  .option-line-sub-title {
    color: rgb(82, 81, 81);
    line-height: 40px;
    font-size: 13px;
    text-align: left;
  }
</style>
