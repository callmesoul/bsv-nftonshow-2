import { Buffer } from 'buffer'

import { store } from '@/store'
import { ElMessage, ElMessageBox } from 'element-plus'
import i18n from '@/utils/i18n'
import { router } from '@/router'
import {
  GetFeeInfo,
  GetMetaFileByHash,
  GetMyNftEligibility,
  Langs,
  QueryFindMetaDataForPost,
} from '@/api'
import type { UploadFile } from 'element-plus/es/components/upload/src/upload.type'
import Decimal from 'decimal.js-light'
import CryptoJs from 'crypto-js'
import encHex from 'crypto-js/enc-hex'


export function checkVersion(){
  if(store.state.isIOS){
    let version=store.state.version.split('.')
    let str=''
    version.map((item)=>{
      str +=item
    })
    if(+str <= 218){
      return ElMessage.error(`${i18n.global.t('currentVersionNotSupport')}`)
    }
  }             
}

export function tranfromImgFile(file: File) {
  return new Promise<MetaFile>(async (resolve, reject) => {
    function readResult(blob: Blob) {
      return new Promise<void>((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => {
          // @ts-ignore
          const wordArray = CryptoJs.lib.WordArray.create(reader.result)
          // @ts-ignore
          const buffer = Buffer.from(reader.result)
          hex += buffer.toString('hex') // 更新hex
          // 增量更新计算结果
          sha256Algo.update(wordArray) // 更新hash
          resolve()
        }
        reader.readAsArrayBuffer(blob)
      })
    }
    // 分块读取，防止内存溢出，这里设置为20MB,可以根据实际情况进行配置
    const chunkSize = 20 * 1024 * 1024

    let hex = '' // 二进制
    const sha256Algo = CryptoJs.algo.SHA256.create()

    for (let index = 0; index < file.size; index += chunkSize) {
      await readResult(file.slice(index, index + chunkSize))
    }

    const fileType = file.type
    const base64 =
      fileType.indexOf('image') !== -1
        ? 'data:' + fileType + ';base64,' + hexToBase64(hex)
        : URL.createObjectURL(file)

    resolve({
      base64Data: base64,
      hexData: hex,
      name: file.name,
      raw: file,
      data_type: fileType,
      sha256: encHex.stringify(sha256Algo.finalize()),
    })
  })
}

// 转换为图片
export function hexToBase64(str: string) {
  if (!str) {
    return 'https://showjob.oss-cn-hangzhou.aliyuncs.com/index/img_photo_default.png'
  }
  var a = []
  for (let i = 0, len = str.length; i < len; i += 2) {
    a.push(parseInt(str.substr(i, 2), 16))
  }
  var binary = ''
  var bytes = new Uint8Array(a)
  var len = bytes.byteLength
  for (var i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  const sty = window.btoa(binary)
  return sty
}

export function checkSdkStatus() {
  return new Promise<void>((resolve, reject) => {
    // const token = store.state.token
    if (!store.getters.isAuthed) {
      ElMessage.warning(i18n.global.t('toLoginTip'))
      reject()
    } else {
      if (store.state.sdkInitIng) {
        ElMessage.warning(i18n.global.t('loginingTip'))
        reject()
      } else {
        if (!store.state.sdk) {
          ElMessage.warning(i18n.global.t('toLoginTip'))
          reject()
        }
      }
    }
    resolve()
  })
}

export function metafileUrl(metafile: string, width: number = 235) {
  if (typeof metafile !== 'string') return ''
  metafile = metafile.replace('metafile://', '')
  if (metafile === '') return ''
  return `${
    import.meta.env.VITE_AppImgApi
  }/metafile/${metafile}?x-oss-process=image/auto-orient,1/resize,m_lfit,w_${width}/quality,q_80`
}

export function checkTxIdStatus(txId: string) {
  return new Promise(resolve => {})
}

export function setDataStrclassify(data: any) {
  const classify =
    data && data.classifyList instanceof Array
      ? data.classifyList
      : data && typeof data.classifyList === 'string' && data.classifyList !== ''
      ? JSON.parse(data.classifyList)
      : []
  return classify
}

export function nftDataStrGetClassify (dataStr: string) {
  if (!dataStr || dataStr === '') return ''
  const dataJson = JSON.parse(dataStr)
  if (dataJson.classifyList) {
    if(dataJson.classifyList instanceof Array) {
      if(dataJson.classifyList.length > 0 ){
        return dataJson.classifyList[0]
      } else {
        return ''
      }
    }  else if (typeof dataJson.classifyList === 'string'){
      try {
        const classifyList = JSON.parse(dataJson.classifyList)
        if (classifyList.length > 0) {
          return classifyList[0]
        } else {
          return ''
        }
      } catch (error) {
        return ''
      }
    } else {
      return ''
    }
  } else {
    return ''
  }
}

// 去用户中心
export function ToUser(metaId: string) {
  if (store.state.userInfo && store.state.userInfo.metaId === metaId) {
    router.push({ name: 'self' })
  } else {
    router.push({
      name: 'user',
      params: {
        metaId,
      },
    })
  }
}

// 检查是否可以铸造的逻辑
export function checkUserCanIssueNft() {
  return new Promise<boolean>(async resolve => {
    if (import.meta.env.MODE === 'prod' || import.meta.env.MODE === 'gray') {
      const result = await store.state.sdk
        ?.checkUserCanIssueNft({
          metaId: store.state.userInfo!.metaId,
          address: store.state.userInfo!.address,
          language: i18n.global.locale.value === 'en' ? Langs.EN : Langs.CN,
        })
        .catch(() => {
          resolve(false)
        })
      if (result) {
        resolve(true)
      } else {
        resolve(false)
      }
    } else {
      resolve(true)
    }
  })
}

export function getMyNftEligibility(IssueMetaId: string) {
  return new Promise(async resolve => {
    if (import.meta.env.MODE === 'prod' || import.meta.env.MODE === 'gray') {
      const res = await GetMyNftEligibility({
        MetaId: store.state.userInfo!.metaId,
        lang: i18n.global.locale.value === 'en' ? Langs.EN : Langs.CN,
        IssueMetaId,
      }).catch(() => {
        resolve(false)
      })
      // @ts-ignore
      if (res?.code === 0) {
        resolve(true)
      } else {
        // @ts-ignore
        ElMessage.error(res?.data)
        resolve(false)
      }
    } else {
      resolve(true)
    }
  })
}

export function confirmLegalSale(){
  return new Promise((resolve,reject)=>{
    ElMessageBox.confirm(`${i18n.global.t('notAllowOffSale')}`,i18n.global.t('niceWarning'),{
      confirmButtonText: i18n.global.t('confirm'),
          cancelButtonText: i18n.global.t('cancel'),
          closeOnClickModal: false,
    }).then(()=>{
      resolve(true)
    }).catch(() => {
      reject()
    })
  })
}

export function confirmToSendMetaData(amount: number) {
  return new Promise<boolean>(async (resolve, reject) => {
    const userBalanceRes = await store.state.sdk?.getBalance().catch(() => {
      ElMessage.error(i18n.global.t('getBalanceFail'))
      reject()
    })
    if (userBalanceRes && userBalanceRes.code === 200 && userBalanceRes.data.satoshis > amount) {
      ElMessageBox.confirm(
        `${i18n.global.t('useAmountTips')}: ${amount} SATS`,
        i18n.global.t('niceWarning'),
        {
          confirmButtonText: i18n.global.t('confirm'),
          cancelButtonText: i18n.global.t('cancel'),
          closeOnClickModal: false,
        }
      )
        .then(async () => {
          resolve(true)
        })
        .catch(() => {
          reject()
        })
    } else {
      ElMessageBox.alert(
        `
          <p>${i18n.global.t('useAmountTips')}: ${amount} SATS</p>
          <p>${i18n.global.t('insufficientBalance')}</p>
        `,
        {
          confirmButtonText: i18n.global.t('confirm'),
          dangerouslyUseHTMLString: true,
        }
      )
      reject()
    }
  })
}

// export function getUserSeries() {
//   return new Promise<any[]>(async (resolve, reject) => {
//     try {
//       const res = await GetSeries({ page: 1, pageSize: 99 })
//       if (res.code === NftApiCode.success) {
//         for (let i = 0; i < res.data.length; i++) {
//           const getSeriesInfoRes = await GetNFTGenesisInfo({
//             codehash: res.data[i].codeHash,
//             genesis: res.data[i].genesis,
//           })
//           if (getSeriesInfoRes.code === 0) {
//             res.data[i].currentNumber = getSeriesInfoRes.data.count
//           }
//         }
//         resolve(res.data)
//       } else {
//         reject()
//       }
//     } catch (error) {
//       ElMessage.error(i18n.global.t('getSeriesFail'))
//       reject(error)
//     }
//   })
// }

export function getUserSeries() {
  return new Promise(async resolve => {
    const res = await QueryFindMetaDataForPost({
      find: {
        parentNodeName: 'nftGenesis',
        'data.totalSupply': { $gt: 1 },
        'data.seriesName': { $exists: true },
        rootTxId: store.state.userInfo.metaId,
      },
      skip: 0,
      limit: 999,
      sort: { timestamp: -1 },
    })
    if (res.code === 200) {
      res.result.data
    }
  })
}

//查询metacenter配置

export function getMetaCenterConfig(metaId:string | string[]) {
  return new Promise(async resolve => {
    const res = await QueryFindMetaDataForPost({
      find: {
        parentNodeName: 'MetaCenterConfig',
        rootTxId: `${metaId}`,
        isNew: true,
      },
      skip: 0,
      limit: 1,
      sort: { timestamp: -1 },
    })
    if (res.code === 200 && res.result.data[0]) {
      resolve(res.result.data[0])
    }else{
      resolve(null)
    }
  })
}

export function sleep(timer: number = 1000) {
  return new Promise<void>(resolve => {
    setTimeout(() => {
      resolve()
    }, timer)
  })
}

/**
 * @function 处理完用户信息的回调。已处理完reslov,未登陆返回reject
 * 用户处理需要获取用户信息后再可进行的操作
 */
export function checkUserInfoFinish(isAuth = true) {
  return new Promise<void>((resolve, reject) => {
    if (store.getters.isAuthed) {
      if (store.state.userInfo) {
        resolve()
      } else {
        if (store.state.sdkInitIng) {
          let watchUserInfo: any
          let setTimeOutUserInfo: any
          // 设置定时，处理异常
          setTimeOutUserInfo = setTimeout(() => {
            watchUserInfo() // 移除监听
            if (isAuth) {
              ElMessage.warning(i18n.global.t('toLoginTip'))
              router.push('/')
              reject()
            } else {
              resolve()
            }
          }, 50000)
          watchUserInfo = store.watch(
            state => state.userInfo,
            newVal => {
              if (newVal) {
                watchUserInfo() // 移除监听
                clearTimeout(setTimeOutUserInfo) // 定时器
                resolve()
              }
            }
          )
        } else {
          if (isAuth) {
            ElMessage.warning(i18n.global.t('toLoginTip'))
            router.push('/')
            reject()
          } else {
            resolve()
          }
        }
      }
    } else {
      if (isAuth) {
        ElMessage.warning(i18n.global.t('toLoginTip'))
        router.push('/')
        reject()
      } else {
        resolve()
      }
    }
  })
}

export function uploadFile(file:UploadFile){
  
 

  return new Promise(async(resolve)=>{
    const reader = new FileReader();
    reader.onload = async ev => {
      const imgFile:any = ev.target.result;
      await serMinImg(imgFile).then((res:any) => {
        const result =handleFileChange(res, file.raw.name, file.raw.type)
        resolve(result)
      });
      
    };
    reader.readAsDataURL(file.raw);
  })

 
}

function serMinImg(imgData:any){
  const type = imgData.split(";")[0].split(":")[1] || "image/jpeg";
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = imgData;
    image.onload = function() {
      // 比例
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      let imageWidth = 1920;
      let imageHeight = 220;
      canvas.width = imageWidth;
      canvas.height = imageHeight;
      context.drawImage(image, 0, 0, imageWidth, imageHeight);
      canvas.toBlob(
        blob => {
          resolve(blob);
        },
        type,
        parseFloat('1')
      );
    };
  });
}

    // 图片转2进制流
async function handleFileChange(e:any, filename:any, filetype:any) {
  return new Promise((resolve)=>{
    const file = e;
    const fileType = file.type;
    const reader = new FileReader();
    let fileBinary:any;
    reader.onload = () => {
      const arrayBuffer:any = reader.result;
      let buffer;
      let hex;
      if (arrayBuffer) {
        buffer = Buffer.from(arrayBuffer);
        hex = buffer.toString("hex");
        fileBinary = buffer;
      }
      const fileData =
        "data:" + fileType + ";base64," + hexToBase64(hex);
      const imgData:any = {};
      imgData.base64Data = fileData;
      imgData.BufferData = fileBinary;
      imgData.hexData = hex;
      imgData.name = filename;
      imgData.type = filetype;
      imgData.size = e.size;
      // this.imgloading = false;
      imgData.Show = true;

      /*
        fileBinary二进制流
        fileData 图片base64编码
        fileType 文件名
      */
      resolve(imgData)
      
      
      
    };
    reader.readAsArrayBuffer(file);
  })
     
    }


export function base64ToHex(base64Data: string) {
      const raw = atob(base64Data.substring(base64Data.indexOf(',') + 1));
      let result = '';
      for (let i = 0; i < raw.length; i++) {
        const hex = raw.charCodeAt(i).toString(16);
        result += (hex.length === 2 ? hex : '0' + hex);
      }
      return result.toUpperCase();
}




const platform = import.meta.env.VITE_Platform
  ? parseFloat(import.meta.env.VITE_Platform) / 100
  : 0.025
const royalty = import.meta.env.VITE_Royalty
  ? parseFloat(import.meta.env.VITE_Royalty) / 100
  : 0.035
const firstPlatform = import.meta.env.VITE_FirstPlatform
  ? parseFloat(import.meta.env.VITE_FirstPlatform) / 100
  : 0.06
const firstRoyalty = import.meta.env.VITE_FirstRoyalty
  ? parseFloat(import.meta.env.VITE_FirstRoyalty) / 100
  : 0

// 获取用户购买 需额外付费的金额
export function getUserBuyExtraFee(params: {
  codehash: string
  genesis: string
  isFirstSell: boolean
  amount: number
}) {
  return new Promise<{
    platformFee: number
    royaltyFee: number
    total: number,
    platformPercentage: number,
    royaltyPercentage: number
  }>(async (resolve, reject) => {
    try {
      let platformPercentage = params.isFirstSell ? firstPlatform : platform
      let royaltyPercentage = params.isFirstSell ? firstRoyalty : royalty
      
      const res = await GetFeeInfo({ codehash: params.codehash, genesis: params.genesis })
      if (res.code === 0 && res.data) {
        platformPercentage = params.isFirstSell
          ? res.data.first_platform / 100
          : res.data.other_platform / 100
        royaltyPercentage = params.isFirstSell
          ? res.data.first_royalty / 100
          : res.data.other_royalty / 100
      }
      
      let platformFee = Math.ceil(new Decimal(params.amount).mul(platformPercentage).toNumber())
      let royaltyFee = Math.ceil(new Decimal(params.amount).mul(royaltyPercentage).toNumber())
      const minAmount = parseInt(import.meta.env.VITE_MinAmount)
      if (platformFee < minAmount && platformFee !== 0) platformFee = minAmount
      if (royaltyFee < minAmount && royaltyFee !== 0) royaltyFee = minAmount
      
      resolve({
        platformFee,
        royaltyFee,
        total: platformFee + royaltyFee >= minAmount || platformFee + royaltyFee === 0  ? platformFee + royaltyFee : minAmount,
        platformPercentage,
        royaltyPercentage
      })
    } catch (error) {
      reject(error)
    }
  })
}

// 是否冬奥系列
export function isWinterOlympicSeries (genesis: string, codehash: string) {
  const series = [
    {
      genesis: '75a54625033c5b109df1667bfe53ea3a3cebc0c1',
      codehash: '22519e29424dc4b94b9273b6500ebadad7b9ad02'
    },
    {
      genesis: '071022161e00db31c6e8cf4dfc32b10acbee2039',
      codehash: '22519e29424dc4b94b9273b6500ebadad7b9ad02'
    },
    {
      genesis: '9c39bec1ed94867404cf7a9ccdb68f11acc8ce6c',
      codehash: '22519e29424dc4b94b9273b6500ebadad7b9ad02'
    },
    {
      genesis: 'bae198a3807febaaa34ba934a084051527c6b221',
      codehash: '22519e29424dc4b94b9273b6500ebadad7b9ad02'
    },
    {
      genesis: 'ccf0b9852afc82f976d39c9e2ec02a7b501dd245',
      codehash: '22519e29424dc4b94b9273b6500ebadad7b9ad02'
    },
    {
      genesis: '3c13169443de24533a3d81e5627ab60fe818f380',
      codehash: '22519e29424dc4b94b9273b6500ebadad7b9ad02'
    },
    {
      genesis: '0e22864ed5e96c7ff96dd6628889e0f5d2a0daf2',
      codehash: '22519e29424dc4b94b9273b6500ebadad7b9ad02'
    },
    {
      genesis: '0687f8eaaad0680ca6441579709094682d4a5dab',
      codehash: '22519e29424dc4b94b9273b6500ebadad7b9ad02'
    },
    {
      genesis: 'd32ce142d1dc4cb4581f9ec4b0839dd80c5725c2',
      codehash: '22519e29424dc4b94b9273b6500ebadad7b9ad02'
    },
    {
      genesis: 'c04f2af56088347cab32b73318647cd09c4136b6',
      codehash: '22519e29424dc4b94b9273b6500ebadad7b9ad02'
    },
    {
      genesis: '376e6a397a7aae84bc04f7492c74ba6d1c5c6b3d',
      codehash: '22519e29424dc4b94b9273b6500ebadad7b9ad02'
    },
    {
      genesis: '10ec817567a29ac0543666d4876433d7f087700c',
      codehash: '22519e29424dc4b94b9273b6500ebadad7b9ad02'
    }
  ]
  const index = series.findIndex(item => item.codehash === codehash && item.genesis === genesis)
  return index === -1 ? false : true
}


// 判断文件sha256是否上过链， 如果传metaId则表示需对应metaId上传的
export function isExistSha256(sha256: string, metaId?: string) {
  return new Promise<GetMetaFileByHashResDataItem | false>(async (resolve, reject) => {
    try {
      const res = await GetMetaFileByHash(sha256)
      if (res && res.code === 0 && res.data.results.items && res.data.results.items.length > 0) {
        if (metaId) {
          const item = res.data.results.items.find(item => item.metaId === metaId)
          if (item) {
            resolve(item)
          } else {
            resolve(false)
          }
        } else {
          resolve(res.data.results.items[0])
        }
      } else {
        resolve(false)
      }
    } catch (error) {
      reject(error)
    }
  })
}


export function format(num:string){
  let reg=/\d{1,3}(?=(\d{3})+$)/g
  return (num + '').replace(reg, '$&,')
}

