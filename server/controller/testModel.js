const {spawn} = require('child_process');

const chatbot = async (req,res) => {
    const {text} = req.body;
    const childPython = spawn('python',['medibot.py',text])

    childPython.stdout.on('data',(data) => {
        console.log(`stdout: ${data}`);
        res.send({data:data.toString()} );
    })

    childPython.stderr.on('data',(data) => {
        console.log(`stderr: ${data}`);
    })

    childPython.on('close',(code) => {
        console.log(`child process exited with code ${code}`);
    })
}

module.exports = {chatbot}