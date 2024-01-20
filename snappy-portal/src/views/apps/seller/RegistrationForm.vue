<template>
<div> 
  <form-wizard 
   color="#ff5a60"
      :title="null"
      :subtitle="null"
      shape="square"
      finish-button-text="Submit"
      back-button-text="Previous"
      class="mb-3"
      @on-complete="formSubmitted"
  >
 
    <tab-content
        title="Account Details"
      
      >
       
          <b-row>
            <b-col
              cols="12"
              class="mb-2"
            >
            
              <small class="text-muted">
                Enter Your Account Details.
              </small>
            </b-col>
            <b-col md="6">
              <b-form-group
                label="Username"
                label-for="name"
              >
             
                  <b-form-input
                    id="name"
                    v-model="vendorObj.userName"
                    :state="errors.length > 0 ? false:null"
                    placeholder="Enter your name here"
                     
                  />

              </b-form-group>
            </b-col>
            <b-col md="6">
              <b-form-group
                label="Email"
                label-for="email"
              >
                
                  <b-form-input
                    id="email"
                    v-model="vendorObj.email"
                    type="email"
                   
                    placeholder="Enter your email here"
                  />
              
              
              </b-form-group>
            </b-col>
            <b-col md="6">
            
              <b-form-group
                label="Password"
                label-for="password"
              
              >
              
             
              <b-form-input
                    id="password"
                    v-model="vendorObj.password"
                    type="password"
                   
                    placeholder="Password"
                  />
               
                
              </b-form-group>
             
         
                 
            </b-col>
            <b-col md="6">
              
            
              
            
               <b-form-group
                label="Confirm Password"
                label-for="c-password"
              
              >

                  <b-form-input
                    id="c-password"
                    v-model="passwordCon"
                    type="password"
                    :state="errors[0] ? false : (valid ? true : null)"
                    placeholder="Re-type Password"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
          </b-form-group>
           
       

             
            </b-col>
          </b-row>
        
        <br>
          <b-row>
            <b-col
              cols="2"
              class="mb-2"
            >
              <h5 class="mb-0">
                Partner Details
              </h5>
              <small class="text-muted">
                Enter Your Partner Details.
              </small>

              </b-col>
            <b-col
              cols="1"
              
            >
<!--            
              <b-form-input v-model="value" type="number"  @change="AddMoreP()"></b-form-input> -->
              </b-col>
             
               <b-col
              cols="8"
              
            >
              </b-col>

            
            
          
          </b-row>
          <b-row>
           
          <b-col md="6">
              <b-form-group
                label="Name"
                label-for="partner_name"
              >
                
             
                  <b-form-input
                    id="partner_name"
                    v-model="vendorObj.name"
                    :state="errors.length > 0 ? false:null"
                    placeholder="Enter name here"
                  />
                
              </b-form-group>
            </b-col>
            <b-col md="6">
              <b-form-group
                label="Email"
                label-for="email"
              >
                
                  <b-form-input
                    id="partner_email"
                    v-model="vendorObj.pemail"
                    type="email"
                    :state="errors.length > 0 ? false:null"
                    placeholder="Enter email here"
                  />
               
              </b-form-group>
            </b-col>
            <b-col md="6">
              <b-form-group
                label="Emirates id"
                label-for="emiratesId"
              >
               
                  <b-form-input
                    id="emiratesId"
                    v-model="vendorObj.emiratesId"
                    :state="errors.length > 0 ? false:null"
                    placeholder="Enter Emirates id"
                  />
                
              </b-form-group>
            </b-col>
  
           
            </b-row>

               <br>
          <b-row>
            <b-col
              cols="2"
              class="mb-2"
            >
              <h5 class="mb-0">
                Partner Details
              </h5>
              <small class="text-muted">
                Enter Your Partner Details.
              </small>

              </b-col>
            <b-col
              cols="1"
              
            >
<!--            
              <b-form-input v-model="value" type="number"  @change="AddMoreP()"></b-form-input> -->
              </b-col>
             
               <b-col
              cols="8"
              
            >
              </b-col>

            
            
          
          </b-row>
          <b-row>
           
          <b-col md="6">
              <b-form-group
                label="Name"
                label-for="partner_name"
              >
                
             
                  <b-form-input
                    id="partner_name"
                    v-model="vendorObj.name"
                    :state="errors.length > 0 ? false:null"
                    placeholder="Enter name here"
                  />
                
              </b-form-group>
            </b-col>
            <b-col md="6">
              <b-form-group
                label="Email"
                label-for="email"
              >
                
                  <b-form-input
                    id="partner_email"
                    v-model="vendorObj.pemail"
                    type="email"
                    :state="errors.length > 0 ? false:null"
                    placeholder="Enter email here"
                  />
               
              </b-form-group>
            </b-col>
            <b-col md="6">
              <b-form-group
                label="Emirates id"
                label-for="emiratesId"
              >
               
                  <b-form-input
                    id="emiratesId"
                    v-model="vendorObj.emiratesId"
                    :state="errors.length > 0 ? false:null"
                    placeholder="Enter Emirates id"
                  />
                
              </b-form-group>
            </b-col>
  
           
            </b-row>

               <br>
          <b-row>
            <b-col
              cols="2"
              class="mb-2"
            >
              <h5 class="mb-0">
                Partner Details
              </h5>
              <small class="text-muted">
                Enter Your Partner Details.
              </small>

              </b-col>
            <b-col
              cols="1"
              
            >
<!--            
              <b-form-input v-model="value" type="number"  @change="AddMoreP()"></b-form-input> -->
              </b-col>
             
               <b-col
              cols="8"
              
            >
              </b-col>

            
            
          
          </b-row>
          <b-row>
           
          <b-col md="6">
              <b-form-group
                label="Name"
                label-for="partner_name"
              >
                
             
                  <b-form-input
                    id="partner_name"
                    v-model="vendorObj.name"
                    :state="errors.length > 0 ? false:null"
                    placeholder="Enter name here"
                  />
                
              </b-form-group>
            </b-col>
            <b-col md="6">
              <b-form-group
                label="Email"
                label-for="email"
              >
                
                  <b-form-input
                    id="partner_email"
                    v-model="vendorObj.pemail"
                    type="email"
                    :state="errors.length > 0 ? false:null"
                    placeholder="Enter email here"
                  />
               
              </b-form-group>
            </b-col>
            <b-col md="6">
              <b-form-group
                label="Emirates id"
                label-for="emiratesId"
              >
               
                  <b-form-input
                    id="emiratesId"
                    v-model="vendorObj.emiratesId"
                    :state="errors.length > 0 ? false:null"
                    placeholder="Enter Emirates id"
                  />
                
              </b-form-group>
            </b-col>
  
           
            </b-row>
         
      
 



  </tab-content>

  <tab-content title="Bakery Info">
     <b-row>
          <b-col md="6">
            <b-row>
                <b-col
                cols="12"
                class="mb-2"
                >
                <h5 class="mb-0">
                    Bakery Details
                </h5>
                <small class="text-muted">Enter Your bakery details.</small>
                </b-col>
                 <b-col md="12">
                  <b-form-group
                    label="Bakery Name"
                    label-for="bakery_name"
                  >
                 
                    <b-form-input
                        id="bakery_name"
                        v-model="vendorObj.bakeryName"
                        placeholder="Enter bakery name"
                        :state="errors.length > 0 ? false:null"
                       
                    />
            
                </b-form-group>
                </b-col>
                  <b-col md="6">

                    <b-form-group
                    label="Profile picture"
                    label-for="profile_picture">
                      
                    
                       <input
                         type="file"
                        id="fileProfile"
                        hidden 
                        ref="fileProfile"
                        @change="selectlogo()"
                        accept="image/*"  />
                       
                         <div><img v-if= "logoloading==false" :src="plus" @click="$refs.fileProfile.click()" style="width: 7vw; height: 7vw; padding-left:20px; padding-top:20px;" alt="imgAdd"/></div>
                           <div v-if= "logoloading==true" class="text-center" style="margin-left:40px; margin-top:50px;"> <i class="fas fa-circle-notch fa-spin fa-2x" style="color:grey"></i>
                           </div>
                    </b-form-group>

                    
                  </b-col>
                  <b-col md="6">
                    <b-form-group
                    label="Cover picture"
                    label-for="cover_picture">
                      <div><img v-if= "coverloading==false" :src="cover" @click="$refs.fileCover.click()" style="width: 7vw; height: 7vw; padding-left:20px; padding-top:20px;" alt="imgAdd"/></div>
                    <div v-if= "coverloading==true" class="text-center" style="margin-left:40px; margin-top:50px;"> <i class="fas fa-circle-notch fa-spin fa-2x" style="color:grey"></i>
                           </div>
                      <input
                        type="file"
                        id="fileCover"
                        hidden
                        ref="fileCover"
                        @change="selectCover()"
                        accept="image/*"
                      />
                    </b-form-group>
                  </b-col>
                
                 <b-col md="12">
                  <b-form-group
                    label="About Us (Optional)"
                    label-for="aboutUs"
                  >
                  
                    <textarea
                        rows="4"
                        class="form-control"
                        id="aboutUs"
                        v-model="vendorObj.about"
                        placeholder="Enter the details about your bakery"
                        :state="errors.length > 0 ? false:null"
                    />
                    
                  </b-form-group>
                </b-col>
                <b-col md="12">
                <b-form-group
                    label="Address"
                    label-for="address"
                >

                    <b-form-input
                        id="address"
                        v-model="vendorObj.address"
                        placeholder="Enter bakery address"
                        :state="errors.length > 0 ? false:null"
                    />
                   
                </b-form-group>
                </b-col>
                <b-col md="12">
              
                    <b-form-group
                    label="City"
                    label-for="City"
                    :state="errors.length > 0 ? false:null"
                    >
                    <v-select
                        id="city"
                        v-model="vendorObj.city"
                        :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                        :options="cityName"
                       
                        label="text"
                        placeholder="Select city"
                    />
                
                    </b-form-group>
              
                </b-col>
                <b-col md="12">
                  <b-form-group
                      label="Contact No"
                      label-for="contact"
                  >
                     
                      <b-row>
                        <b-col md="3">
                          <b-form-input
                              id="contactCode"
                              placeholder="971"
                              disabled
                              aria-label="971"  
                          />
                        </b-col>
                        <b-col md="9">
                          <b-form-input
                            id="contact"
                            v-model="vendorObj.contactNo"
                            placeholder="Enter contact number "
                            :state="errors.length > 0 ? false:null"
                            pattern="[A-Za-z0-9]+"
                          />
                        </b-col>
                      </b-row>

                  </b-form-group>
                </b-col>
                <b-col md="12">
                <b-form-group
                    label="Website (Optional)"
                    label-for="website"
                >
                    
                    <b-form-input
                        id="website"
                        v-model="vendorObj.url"
                        placeholder="Enter website address "
                        :state="errors.length > 0 ? false:null"
                    />
                  
                </b-form-group>
                </b-col>
                <b-col md="12">
                <b-form-group
                    label="Trade License Number"
                    label-for="tradeLicenseNo"
                >
                    
                    <b-form-input
                        id="tradeLicenseNo"
                        v-model="vendorObj.tradeLicenseNum"
                        placeholder="Enter trade license number "
                        :state="errors.length > 0 ? false:null"
                    />
                 
                </b-form-group>
                </b-col>
                <b-col md="12">
                <b-form-group
                    label="Trade License Expiry Date"
                    label-for="tradeLicenseExpiryDate"
                >
                    
                    <flat-pickr
                     id="tradeLicenseExpiryDate"
                    v-model="vendorObj.tradelicenseExDate"
                    class="form-control"
                    placeholder="Select trade license expiry date"

                  />
                   
                </b-form-group>
                </b-col>
                <b-col md="12">
                  <b-form-group
                    label="Product type"
                    label-for="productType"
                  >
                  
                    <v-select
                      multiple="true"
                      v-model="vendorObj.producttype"
                      :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                      :options="productTypeOptions"
                      label="text"
                    
                      placeholder="Select product type"
                    />
                   
                  </b-form-group>
                </b-col>
               
            </b-row>
          </b-col>
          <b-col md="6">
              <!-- <br><br><br> -->
                <!-- <b-form-group
                label="Location"
                label-for="location"
                >
                </b-form-group>
                <b-img :src= "require('@/assets/images/elements/map.jpg')" fluid > </b-img> -->
           </b-col>
          </b-row>
   </tab-content>

   <tab-content title="Upload Documents">
    <b-row>
            <b-col
              cols="12"
              class="mb-2"
            >
            </b-col>
            <b-col lg="6">
              <h5>Upload Emirates ID</h5>  
              <ul>
                <li><small class="text-muted">Upload the front side of emirates id's image </small></li>
                <li><small class="text-muted">Upload the backside side of emirates id's image </small></li>
              </ul> 
            
              <b-form-group               
              >
                <!-- <validation-provider
                  #default="{ errors }"
                  name="Add picture"
                  rules="required"
                > -->
              <div class="container">
                <b-row>
                  <div
                    v-for="idImage in vendorObj.emiratesids"
                    :key="idImage"
                    >
                    <b-col>
                      <div style="box-shadow:3px 7px #e9e4e5; border-radius:8px; width: 130px; height: 106px; padding: 3px " >
                        <b-row >
                            <b-col md="10"></b-col>
                            <b-col md="0">
                              <feather-icon
                                icon="Trash2Icon"
                                size="11"
                                color="#FF5A60"
                              />
                            </b-col>
                          </b-row>
                      <img
                        :src="idImage"
                        width="120"
                        height="80"
                        rounded
                        />
                    
                    </div>
                    </b-col>
                  </div>
                   <div>
                     <img  v-if= "idloading==false"  :src="idCard" @click="$refs.EmpId.click()" style="width: 110px; height: 110px; padding-left:20px; padding-top:20px;" alt="imgAdd"/></div> 
                     <div v-if= "idloading==true" class="text-center" style="margin-left:40px; margin-top:50px;"> <i class="fas fa-circle-notch fa-spin fa-2x" style="color:grey"></i>
                     </div>
                
                </b-row> 
              </div> 
              <input
                  type="file"
                  id="EmpId"
                  hidden
                  ref="EmpId"
                  multiple
                  @change="EmeratesId()"
                  accept= "image/*"/>
                
                   <!-- <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider> -->
              </b-form-group>
              <br>
              <h5>Upload Trade License</h5>
               <ul>
                <li><small class="text-muted">Upload the front side of trade license's image </small></li>
                <li><small class="text-muted">Upload the backside side of trade license's image </small></li>
              </ul> 
             
              <b-form-group
              >
                <!-- <validation-provider
                  #default="{ errors }"
                  name="Add picture"
                  rules="required"
                > -->
                  <div class="container">
                    <b-row>
                      <div
                      v-for="idImage in vendorObj.tradelicenses"
                       :key="idImage"
                      >
                        <b-col>
                          <div style="box-shadow:3px 7px #e9e4e5; border-radius:8px; width: 120px; height: 120px; padding: 3px " >
                            <b-row >
                                <b-col md="10"></b-col>
                                <b-col md="0">
                                  <feather-icon
                                    icon="Trash2Icon"
                                    size="11"
                                    color="#FF5A60"
                                  />
                                </b-col>
                              </b-row>
                          <img
                            :src="idImage"
                            width="110"
                            height="93"
                            rounded
                            />
                          
                        </div>
                        </b-col>
                      </div>
                      <div v-if= "licenseloading==false" >
                      <img   :src="license" @click="$refs.licensefile.click()" style="width: 110px; height: 110px; padding-left:20px; padding-top:20px;" alt="imgAdd"/>
                      </div>
                       
                      <div v-if= "licenseloading==true" class="text-center" style="margin-left:40px; margin-top:50px;"> <i class="fas fa-circle-notch fa-spin fa-2x" style="color:grey"></i>
                      </div>
                    </b-row> 
                  </div> 
                  <input
                  type="file"
                  id="licensefile"
                  hidden
                  ref="licensefile"
                  multiple
                  @change="TLicense()"
                  accept="image/*"
                />
                <!-- <div >
                  <UploadImages />
                </div> -->
                  <!-- <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider> -->
              </b-form-group>
              <br>
               <h5>Upload Sample Products</h5>
                <ul>
                <li><small class="text-muted">Add proper image of sample product </small></li>
                <li><small class="text-muted">Add images of all the sides of product with proper angle</small></li>
              </ul> 
            
              
               <b-form-group>
                <!-- <validation-provider
                  #default="{ errors }"
                  name="Add picture"
                  rules="required"
                > -->
                  <div class="container">
               <b-row>
                <div
                v-for="idImage in vendorObj.productsamples"
                :key="idImage"
                >
                  <b-col>
                     <div style="box-shadow:3px 6px #e9e4e5; border-radius:8px; width: 125px; height: 117px; padding: 3px " >
                      <b-row >
                          <b-col md="10"></b-col>
                          <b-col md="0">
                            <feather-icon
                              icon="Trash2Icon"
                              size="11"
                              color="#FF5A60"
                            />
                          </b-col>
                        </b-row>
                    <img
                      :src="idImage"
                      width="110"
                      height=90
                      rounded
                      />
                   
                   </div>
                  </b-col>
                </div>
                  <img v-if= "sampleloading==false" :src="psample" @click="$refs.psamplefile.click()" style="width: 110px; height: 110px; padding-left:20px; padding-top:20px;" alt="imgAdd"/>
                  <div  v-if= "sampleloading==true" class="text-center" style="margin-left:40px; margin-top:50px;"> <i class="fas fa-circle-notch fa-spin fa-2x" style="color:grey"></i></div>
              </b-row>  
              </div>
               <input
                  type="file"
                  id="psamplefile"
                  hidden
                  ref="psamplefile"
                  multiple
                  @change="PsampleAdd()"
                  accept="image/*"
                />
                  <!-- <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider> -->
              </b-form-group>
            </b-col>
          </b-row>
   </tab-content>
</form-wizard>
</div>
  
</template>
<script>
import { FormWizard, TabContent } from 'vue-form-wizard'
import vSelect from 'vue-select'

import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
import axios from "axios";
import {
  BRow,
  BCol,
  BFormGroup,
  BFormInput,
  BFormInvalidFeedback,
  BImg,
  BCard,
  BFormSpinbutton,
  BFormFile  
} from 'bootstrap-vue'
import { required, email, url } from '@validations'
import { codeIcon } from './code'
import flatPickr from 'vue-flatpickr-component'
//import UploadImages from "vue-upload-drop-images"
export default {
  components: {
    // ValidationProvider,
    // ValidationObserver,
     FormWizard,
     TabContent,
    BRow,
     BCol,
     BFormGroup,
     BFormInput,
     vSelect,
    
    // BFormFile,
    // //ToastificationContent,
    // BImg,
    flatPickr,    
    //BCard,
  },
  created()
  {
 
  },
  mounted()
  {


  },
  data() {

    return {
      Remail:{
        person:'',
        bakery:'',
        email:'',
      },  
      idCard:"https://appick.io/u/lessons/8b023f61-0e91-4562-b21c-d5707503720c.png",
      license:"https://appick.io/u/lessons/8b023f61-0e91-4562-b21c-d5707503720c.png",
      psample:"https://appick.io/u/lessons/8b023f61-0e91-4562-b21c-d5707503720c.png",
      licensefile:'',
      psamplefile:'',
      EmpId:'',
      fileCover:'',
      datenow:'',
      message:0,
      plus:'https://appick.io/u/lessons/8b023f61-0e91-4562-b21c-d5707503720c.png',
      cover:'https://appick.io/u/lessons/8b023f61-0e91-4562-b21c-d5707503720c.png',
      fileProfile:'',
      times:[],
      value:0,
      sampleloading: false,
      idloading: false,
      licenseloading: false,
      
      coverloading: false,
      logoloading: false,
      files: [],
      selectedFiles: undefined,
      //selectedDocs: undefined,
      selectedCity: '',
      selectedLanguage: '',
      name: '',
      emailValue: '',
      PasswordValue: '',
      passwordCon: '',
      first_name: '',
      last_name: '',
      address: '',
      landMark: '',
      pincode: '',
      twitterUrl: '',
      facebookUrl: '',
      googleUrl: '',
      linkedinUrl: '',
      city: '',
      required,
      email,
      codeIcon,
      url,
      vendorP:
      {

        vendorId:0,
        name:'',
        email:'',
        emiratesId:'',

      },
       vendordoc:
      {

        vendorDocId:0,
        vendorId:'',
        documentPath:'',
        docType:'',

      },

      vendorObj:
      {
      
      name:'',
      email:'',
      emiratesId:'',
      userName: '',
      pemail: '',
      password: '',
      bakeryName:'',
      emiratesids:[],
      tradelicenses:[],
      productsamples:[],
     
      logo:'',
      cover:'',
      address: '',
      city: '',
      about: '',
      contactNo: '',
      url: '',
      tradeLicenseNum: '',
      tradelicenseExDate: '',
      producttype: '',
      status:'pending',

      },
     uploadedImagesIDs: [
      
     ],

      uploadedSampleProducts: [
      
     ],
      tradeLicenses: [
      
     ],

      cityName: [
       
        'Abu Dhabi' ,
        'Al-Ain' ,
        'Dubai' ,
        'Sharjah' ,
        'Umm al-Qaiwain' ,
        'Fujairah' ,
        'Ajman' ,
        'Ra’s al-Khaimah' ,
      ],
      
      languageName: [
        { value: 'nothing_selected', text: 'Nothing Selected' },
        { value: 'English', text: 'English' },
        { value: 'Chinese', text: 'Mandarin Chinese' },
        { value: 'Hindi', text: 'Hindi' },
        { value: 'Spanish', text: 'Spanish' },
        { value: 'Arabic', text: 'Arabic' },
        { value: 'Malay', text: 'Malay' },
        { value: 'Russian', text: 'Russian' },
      ],
       productTypeOptions : [
         'Ice-cream Cakes',
          'Sponge Cakes',
          'Pound Cake',
          'Butter Cake',
    ],
    }
  },
  methods: {
//     call(){
// this.vendorObj.bakeryName = "Osama";
// console.log(this.vendorObj.bakeryName );

//     },
//     time() {
//     var self = this
//     this.datenow = moment().format()
//     setTimeout(self.time, 1000) // recursive!
// },
//        callFunction: function () {
//             var v = this;
//             setTimeout(function () {
//                 v.message++;
//             }, 3000);
           
//             console.log(v.message);
//         },
      selectlogo() {
             // console.log("Osama");
           
              this.fileProfile = this.$refs.fileProfile.files[0];
              this.logoloading = true;
              //console.log(this.fileProfile.name);

                //console.log(this.fileProfile, this.loading );
                  //Upload cover
                if (this.fileProfile !== "") {
                  let formData = new FormData();
                  formData.append("file", this.fileProfile);
                  //console.log(this.fileProfile);
                  axios
                  .post("https://upload.appick.io", formData, {
                      headers: {
                        "Content-Type": "multipart/form-data",
                      },
                    })
                    .then((e) => {
                      console.log(e.data);
                      // this.file = undefined;
                      var fn1 =
                        "https://appick.io/u/lessons/" + e.data.myresp[0].filename;
                   // console.log(fn);
                    this.plus = fn1;
                    this.vendorObj.logo = this.plus;
                    // 
                      console.log(this.plus);
                      //console.log(this.myObj.coverImg);
                      this.logoloading = false;
                     
                    //  console.log(this.loading);
                    });
                }

            },
              selectCover() {
             // console.log("Osama");
              this.coverloading = true;
              this.fileCover = this.$refs.fileCover.files[0];

              //console.log(this.fileProfile.name);

                //console.log(this.fileProfile, this.loading );
                  //Upload cover
                if (this.fileCover !== "") {
                  let formData = new FormData();
                  formData.append("file", this.fileCover);
                  //console.log(this.fileProfile);
                  axios
                  .post("https://upload.appick.io", formData, {
                      headers: {
                        "Content-Type": "multipart/form-data",
                      },
                    })
                    .then((e) => {
                      console.log(e.data);
                      // this.file = undefined;
                      var fn2 =
                        "https://appick.io/u/lessons/" + e.data.myresp[0].filename;
                   // console.log(fn);
                    this.cover = fn2;
                    this.vendorObj.cover = this.cover;
                    // 
                      console.log(this.vendorObj.cover);
                      //console.log(this.myObj.coverImg);
                    this.coverloading = false;
                     
                    //  console.log(this.loading);
                    });
                }

            },
            EmeratesId() {
             // console.log("Osama");
             this.idloading = true;
              this.EmpId = this.$refs.EmpId.files[0];

              //console.log(this.fileProfile.name);

                //console.log(this.fileProfile, this.loading );
                  //Upload cover
                if (this.EmpId !== "") {
                  let formData = new FormData();
                  formData.append("file", this.EmpId);
                  //console.log(this.fileProfile);
                  axios
                  .post("https://upload.appick.io", formData, {
                      headers: {
                        "Content-Type": "multipart/form-data",
                      },
                    })
                    .then((e) => {
                      console.log(e.data);
                      // this.file = undefined;
                      var fn2 =
                        "https://appick.io/u/lessons/" + e.data.myresp[0].filename;
                   // console.log(fn);
                    this.vendorObj.emiratesids.push(fn2);
                      this.idloading = false;
                    
                    // 
                      console.log(this.uploadedImagesIDs);
                      //console.log(this.myObj.coverImg);
                    
                     
                    //  console.log(this.loading);
                    });
                }

            },

            TLicense() {
             // console.log("Osama");
             this.licenseloading = true;
              this.licensefile = this.$refs.licensefile.files[0];

              //console.log(this.fileProfile.name);

                //console.log(this.fileProfile, this.loading );
                  //Upload cover
                if (this.licensefile !== "") {
                  let formData = new FormData();
                  formData.append("file", this.licensefile);
                  //console.log(this.fileProfile);
                  axios
                  .post("https://upload.appick.io", formData, {
                      headers: {
                        "Content-Type": "multipart/form-data",
                      },
                    })
                    .then((e) => {
                      console.log(e.data);
                      // this.file = undefined;
                      var fn2 =
                        "https://appick.io/u/lessons/" + e.data.myresp[0].filename;
                   // console.log(fn);
                    this.vendorObj.tradelicenses.push(fn2);

                    
                    // 
                      console.log(this.tradelicenses);
                      //console.log(this.myObj.coverImg);
                    this.licenseloading = false;
                     
                    //  console.log(this.loading);
                    });
                }

            },
     PsampleAdd() {
             // console.log("Osama");
            this.sampleloading= true;
              this.psamplefile = this.$refs.psamplefile.files[0];

              //console.log(this.fileProfile.name);

                //console.log(this.fileProfile, this.loading );
                  //Upload cover
                if (this.psamplefile !== "") {
                  let formData = new FormData();
                  formData.append("file", this.psamplefile);
                  //console.log(this.fileProfile);
                  axios
                  .post("https://upload.appick.io", formData, {
                      headers: {
                        "Content-Type": "multipart/form-data",
                      },
                    })
                    .then((e) => {
                      console.log(e.data);
                      // this.file = undefined;
                      var fn2 =
                        "https://appick.io/u/lessons/" + e.data.myresp[0].filename;
                   // console.log(fn);
                    this.vendorObj.productsamples.push(fn2);

                      this.sampleloading= false;
                    // 
                      console.log(this.uploadedSampleProducts);
                      //console.log(this.myObj.coverImg);
                    
                     
                    //  console.log(this.loading);
                    });
                }

            },


    AddMoreP()
    {
    
     
    this.times.push(this.value);
      console.log(this.times);
    },
    // addMoreIDs(){
    //   this.selectedFiles = this.$refs.filee.files;
    //   // if (this.selectedFiles !== undefined) {
    //   //     let formData = new FormData();
    //   //     for (let index = 0; index < this.selectedFiles.length; index++) {
    //   //       const element = this.selectedFiles[index];
    //   //       console.log("elem", element);
    //   //       formData.append("file", element);
    //   //       this.uploadedImagesIDs.append(element);
    //   //     }
    //   //     this.selectedFiles = undefined;
    //   //     this.loading = false;
     
    //   // }

    //   //upload id images
    //   // if (this.selectedFiles !== undefined) {
    //   //     let formData = new FormData();
    //   //     for (let index = 0; index < this.selectedFiles.length; index++) {
    //   //       const element = this.selectedFiles[index];
    //   //       console.log("elem", element);
    //   //       formData.append("file", element);
    //   //     }

    //   //     axios
    //   //       .post(this.$store.state.upload, formData, {
    //   //         headers: {
    //   //           "Content-Type": "multipart/form-data",
    //   //         },
    //   //       })
    //   //       .then((e) => {
    //   //         e.data.myresp.forEach((elem) => {
    //   //           console.log(elem.path);
    //   //           axios
    //   //             .post(this.$store.state.domain + "/shoesImages", {
    //   //               //shoe_id: this.myObj.shoe_id,
    //   //               imgURL: "https://appick.io/u/" + elem.path,
    //   //             })
    //   //             .then((res) => {
    //   //               console.log("image uploaded", res);
    //   //               //this.LoadImages(this.myObj.shoe_id);
    //   //             })
    //   //             .catch((err) => {
    //   //               console.error("upload error", err);
    //   //             });
    //   //         });              

    //   //       })
    //   //       .catch((error) => {
    //   //         console.log("Server Error on saving: ", error);
    //   //       })
    //   //       .finally(() => {
              
    //   //         this.selectedFiles = undefined;
    //   //         this.spin = "";
    //   //         this.loading = false;
    //   //       });
    //   //   }
    //   console.log(this.selectedFiles);
    // },
    //  uploadFiles: function () {
    //     // Using the default uploader. You may use another uploader instead.
    //     this.$refs.vueFileAgent.upload(this.uploadUrl, this.uploadHeaders, this.fileRecordsForUpload);
    //     this.fileRecordsForUpload = [];
    //   },
    //   deleteUploadedFile: function (fileRecord) {
    //     // Using the default uploader. You may use another uploader instead.
    //     this.$refs.vueFileAgent.deleteUpload(this.uploadUrl, this.uploadHeaders, fileRecord);
    //   },
    //   filesSelected: function (fileRecordsNewlySelected) {
    //     var validFileRecords = fileRecordsNewlySelected.filter((fileRecord) => !fileRecord.error);
    //     this.fileRecordsForUpload = this.fileRecordsForUpload.concat(validFileRecords);
    //   },
    //   onBeforeDelete: function (fileRecord) {
    //     var i = this.fileRecordsForUpload.indexOf(fileRecord);
    //     if (i !== -1) {
    //       this.fileRecordsForUpload.splice(i, 1);
    //     } else {
    //       if (confirm('Are you sure you want to delete?')) {
    //         this.$refs.vueFileAgent.deleteFileRecord(fileRecord); // will trigger 'delete' event
    //       }
    //     }
    //   },
    //   fileDeleted: function (fileRecord) {
    //     var i = this.fileRecordsForUpload.indexOf(fileRecord);
    //     if (i !== -1) {
    //       this.fileRecordsForUpload.splice(i, 1);
    //     } else {
    //       this.deleteUploadedFile(fileRecord);
    //     }
    //   },

    clearFiles() {
      this.$refs['file-input'].reset()
      },

    fileSelected(e) {
    this.files = e.target.files
    },
    formSubmitted() {

 
  
//router.push("auth-login");

var axios = require('axios');
var data = this.vendorObj
var config = {
  method: 'post',
  url: 'https://okaaik.fastech.pk/api/vendors/Postvendor/',
  headers: { 
    'Authorization': 'Bearer pKFBCiJ2J0r5BGU-mlOiSN_IWZF7m2Oxl1yv_PskYmT1udlK7seq3djoVgNfgDLJELFwwxdcYd9LQcvH9OVIpYyZTNrUPDuV9sAzC1WNz2SYEt2TIzJpWmzwAQcPbucnq-ALeFSQc6CsrxFhMacr3bc_KL0Cvl4diQUTvChDZVx4NPxZ-VtMXHiLMzvpBAcrxCQ2rF3V5TpBZFDXDBs1EIonYD9GCG9PHu6U-iIAXKAJ3Xi97-S2kqUd5SwXg0ANLKDqYiWHyF2OJev3_V4g48e9ApFAN4zm7nAPvv1vXZW5H-0vxXBZb1WulF-q5Ljp', 
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
.then((response) => {
  //console.log(response.data.status);
  if(response.data.status == "success")
  {
   this.Remail.person= this.vendorObj.userName;
   this.Remail.email= this.vendorObj.email;
   this.Remail.bakery = this.vendorObj.bakeryName;

    var axios = require('axios');
    var config = {
     method: 'post',
      url: 'https://mancave.appick.io/oemail/signup',
      headers: { 
    'Content-Type': 'application/json'
      },
      data : this.Remail
};

axios(config)
.then( (response) => {
  console.log(JSON.stringify(response.data));

})
.catch(function (error) {
  console.log(error);
});

    console.log("working");     
    Swal.fire(
  'Registered!',  
  'Your request is submitted for approval!',
  'success'
).then((res)=>{


 this.$router.push('/login')

})

  }
  else
  {
console.log("notworking");   
  }

})
.catch( (error) =>{
  console.log(error);
});
      


    },
    validationForm() {
      return new Promise((resolve, reject) => {
        this.$refs.accountRules.validate().then(success => {
          if (success) {
            console.log("Osama");
            resolve(true)
          } else {
            reject()
          }
        })
      })
    },
    validationFormBakeryDetails() {
      return new Promise((resolve, reject) => {
        this.$refs.bakeryDetails.validate().then(success => {
          if (success) {

            resolve(true)
          } else {
            reject()
          }
        })
      })
    },
    validationFormUploadDoc() {
      return new Promise((resolve, reject) => {
        this.$refs.uploadDoc.validate().then(success => {
          if (success) {
            resolve(true)
          } else {
            reject()
          }
        })
      })
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-flatpicker.scss';

</style>
