class TestPlugin{
    constructor(){}
    apply(compiler){
        compiler.hooks.emit.tap('TestPlugin',(compilation)=>{
            console.log('test')
        })
    }
}

module.exports=TestPlugin