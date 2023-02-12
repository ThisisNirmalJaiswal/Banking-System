const st=(value)=>{
    return /^[A-Za-z]{7,29}$/.test(value)
   
}

const ust=(value)=>{
    return /^[A-Za-z][A-Za-z_0-9]{7,29}$/.test(value)
   
}

const pass=(value)=>{
    return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value) 
}

const num=(value)=>{
    return /^[6-9]\d{9}$/.test(value) 
}

const em=function(email){
    return /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email)
}


module.exports={st,ust,pass,num,em}