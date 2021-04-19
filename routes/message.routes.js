const {Router} = require('express')
const messageDao = require('../repository/message.dao')

const messageRouter = Router()
messageRouter.get('/getMessage/:id', async (req, res)=>{
    try {
        const { id } = req.params
        const getMessageDB = await messageDao.getMessage(id)
        return res.status(200).json(getMessageDB)
    } catch (error) {
        res.status(500).json({ message: 'Erro ao recuperar mensagens'})
    }
})

messageRouter.post('/sendMessage', async (req, res) =>{
    try {
        
        const { author, read, bodyMessage } = req.body;
          if( !req.body.bodyMessage ){
            return res.status(400).json({ message: 'Por favor escreva uma mensagem!'})
        }
        const messageDB = await messageDao.sendMessage(req.body)
        return res.status(201).json(messageDB)
    } catch (error) {
        res.status(500).json({ message: 'Erro ao enviar mensagem'})        
    }
})
messageRouter.get('/getAdm/:id', async (req, res)=>{
    try {
        const { id } = req.params;
        const idAdm = await messageDao.getIdAdm(id)
        res.status(200).json({idAdm})
    } catch (error) {
        res.status(500).json({ message: 'Mensagem não pode ser enviada'}) 
    }
})
module.exports = messageRouter;