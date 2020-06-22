module.exports = {

	getConversations: {		
			name: 'Armando Martínez López',
			senderImgSrc: './assets/me.png',
			recipientImgSrc: './assets/avatar-2.png',
			selectedConversation: [{
					time: 'Tue Mar 31 2020 17:20:02 GMT+0200 (hora de verano de Europa central)',
					isRead: false,
					isClient: true,
					messages: [{
						id: 1,
						text: 'Hola Armando, para el mes de noviembre tenemos una promoción exclusiva, tarjeta America Express sin anualidad por 2 años y línea de crédito de $40,000.00',
						hasError: true
					}]
				},
				{
					time: 'Tue Mar 31 2020 17:20:02 GMT+0200 (hora de verano de Europa central)',
					isRead: false,
					isClient: false,
					messages: [{
						id: 3,
						text: 'Hola Mario, me interesa.',
						hasError: false
					}]
				}
			]
	},

	getData: {
			leftIcon: 'sn-FUNC023',
			enablePicker: false
	},

	massiveMessage: (req) => {
		const receivers = req.body.receivers;
		const messages = [];
		receivers.forEach((user)=>{
			messages.push({
				id: Math.floor(Math.random()*123456789),
				conversationId: req.body.message.conversationId,
				from: req.body.message.from,
				to: user,
				type: "TEXT",
				text: {
					body: req.body.message.text.body
				},
				statusMsg: {
				status: "Enviado",
				timestamp: new Date()
				},
				creationDateTime: new Date()
			});
		});


		return {
			data: {
			  messages: messages
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
  },
  
  putMessage: (req) => {
    return {
      "data": {
        "messages": [
          {
            "status": "ELIMINADO",
          }
        ]
      },
      "notifications": [
        {
          "code": "string",
          "message": "string",
          "timestamp": "2020-05-13T19:31:46.398Z"
        }
      ]
    }
  }
};
