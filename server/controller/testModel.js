const {spawn} = require('child_process');

const chatbot = async(req,res) => {
    const childPython = spawn('python',['medibot.py',req.body.text])

    childPython.stdout.on('data',(data) => {
        console.log(`stdout: ${data}`);
        res.send(data);
    })

    childPython.stderr.on('data',(data) => {
        console.log(`stderr: ${data}`);
    })

    childPython.on('close',(code) => {
        console.log(`child process exited with code ${code}`);
    })
}

module.exports = {chatbot}