module.exports = {
    conversation:{
        data: {
            conversation: {
            id: "123456",
            managerId: "34567890",
            clientId: "34562343",
            creationDateTime: new Date()
            }
        },
        notifications: [
            {
                code: "E422CDNPAYRCPTG001",
                message: "Something happened",
                timestamp: "2020-04-12T17:09:11.716Z"
            }
        ]
    },
    postMessage: (req) => {
      const message = {
        id: Math.floor(Math.random()*123456789),
        conversationId: req.body.conversationId,
        from: req.body.from,
        to: req.body.to,
        type: "TEXT",
        text: req.body.text? req.body.text: null,
        document: req.body.document? req.body.document : null,
        image: req.body.image? req.body.image : null,
        status: "Enviado",
        creationDateTime: new Date()
      }
      return {
        data: {
          message: message
        },
        notifications: [
          {
          "code": "string",
          "level": "string",
          "message": "string",
          "timestamp": "2020-04-21T20:11:25.474Z"
          }
        ]
      }
    }
};
