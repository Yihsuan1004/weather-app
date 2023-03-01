
//各地觀測站資料請參考 https://e-service.cwb.gov.tw/wdps/obs/state.htm

export const availableLocations = [
    {
        cityName: '基隆市',
        locationName: '基隆',
        areas: 'northern',
        sunriseCityName: '基隆',
    },
    {
        cityName: '臺北市',
        locationName: '臺北',
        areas: 'northern',
        sunriseCityName: '臺北',
    },
    {
        cityName: '新北市',
        locationName: '新北',
        areas: 'northern',
        sunriseCityName: '新北市',
    },
    {
        cityName: '桃園市',
        locationName: '新屋',
        areas: 'northern',
        sunriseCityName: '桃園',
      },
    {
        cityName: '新竹縣',
        locationName: '新竹',
        areas: 'northern',
        sunriseCityName: '新竹',
    },
    {
        cityName: '宜蘭縣',
        locationName: '宜蘭',
        areas: 'northern',
        sunriseCityName: '宜蘭',
    },
    {
        cityName: '臺中市',
        locationName: '臺中',
        areas: 'central',
        sunriseCityName: '臺中',
    },
    {
        cityName: '南投縣',
        locationName: '日月潭',
        areas: 'central',
        sunriseCityName: '南投',
    },
    {
        cityName: '彰化縣',
        locationName: '彰師大',
        areas: 'central',
        sunriseCityName: '彰化',
    },
    {
        cityName: '雲林縣',
        locationName: '雲林',
        areas: 'central',
        sunriseCityName: '屏東',
    },
    {
        cityName: '嘉義縣',
        locationName: '阿里山',
        areas: 'southern',   
        sunriseCityName: '嘉義',
    },
    {
        cityName: '嘉義市',
        locationName: '嘉義',
        areas: 'southern',
        sunriseCityName: '嘉義',
    },
    {
        cityName: '臺南市',
        locationName: '南區中心',
        areas: 'southern',
        sunriseCityName: '臺南',
    },
    {
        cityName: '高雄市',
        locationName: '高雄',
        areas: 'southern',
        sunriseCityName: '高雄',
    },
    {
      cityName: '屏東縣',
      locationName: '恆春',
      areas: 'southern',
      sunriseCityName: '屏東',
    },
    {
        cityName: '花蓮縣',
        locationName: '花蓮',
        areas: 'eastern',
        sunriseCityName: '花蓮',
    },
    {
      cityName: '臺東縣',
      locationName: '臺東',
      areas: 'eastern',
      sunriseCityName: '臺東',
    },
   
    {
      cityName: '金門縣',
      locationName: '金門',
      areas: 'outlying-island',
      sunriseCityName: '金門',
    },
    {
      cityName: '連江縣',
      locationName: '馬祖',
      areas: 'outlying-island',
      sunriseCityName: '馬祖',
    },
    {
      cityName: '澎湖縣',
      locationName: '澎湖',
      areas: 'outlying-island',
      sunriseCityName: '澎湖',
    }
  ];

  export const findLocation = (cityName) => {
    return availableLocations.find(location => location.cityName === cityName);
  };

 