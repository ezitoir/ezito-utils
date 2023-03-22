module.exports = function(valueSize = ''){
    const base = 1024 ;
    const unity = { b : 1000 , kb : base , mb : Math.pow( base , 2), gb :Math.pow(base, 3) };
    if(Number(valueSize)){
        return valueSize ;
    }
    else if(typeof valueSize === "string"){
        const modifay = valueSize.trim().split(/([a-z]+)/g).slice(0,2);
        if( modifay.length > 2 ) throw new Error('invalid size file');
        if( !!!Number(modifay.at(0)) ) throw new Error('invalid size file . example 1kb.');
        if(unity[modifay.at(1).toLocaleLowerCase()]){ 
            return Number(modifay.at(0)) * unity[modifay.at(1)]
        }
        else {
            if( modifay.length > 2 ) throw new Error('invalid size file . using numer for file zise if extra file');
        }
    }
}