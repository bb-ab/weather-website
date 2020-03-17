const request=require('request')

const forecast=(latitude,longitude,callback)=>{
    const url='https://api.darksky.net/forecast/a91231ff79cacdba3030ab13e4c87615/' + latitude + ',' + longitude + '?units=si&lang=en'

    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Unable toconnect to weather service!',undefined)
        }else if(body.error){
            callback('Unable to find given location',undefined)
        }else{
            callback(undefined,body.daily.data[0].summary + 'It is currently ' + body.currently.temperature + ' degrees out . There is a ' + body.currently.precipProbability + '% chance of rain')
            
        }
    })
}

module.exports=forecast