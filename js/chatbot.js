

var accessToken ="40d15f3038ee46b198e41bcadf7ac468";
var baseUrl = "https://api.dialogflow.com/v1/";

    
(function () {
    var Message;
    Message = function (arg) {
        this.text = arg.text, this.message_side = arg.message_side;
        this.draw = function (_this) {
            return function () {
                var $message;
                $message = $($('.message_template').clone().html());
                $message.addClass(_this.message_side).find('.text').html(_this.text);
                $('.messages').append($message);
                return $message.addClass('appeared');
               
            };
        }(this);
        return this;
    };
    $(function () {

     
    });
    $(function () {
        var getMessageText, message_side, sendMessage, respText;
        message_side = 'left';


        //Welcome Text when page loads.
        var $messagesInput;
        $messagesInput = $('.messages');
        message_side = message_side ===  'right' ? 'left' : 'right';
        messageInput = new Message({
                                     text: "Welcome to LA NONNA. Hi! I'm Winnie,and I'm the virtual assistant of LA NONNA restaurant. You can ask for restaurants by reservation, about La Nonna restaurant,  where you can find us or weekly promotion. How may I help you?)",message_side: message_side});


        messageInput.draw();
        $messagesInput.animate({ scrollTop: $messagesInput.prop('scrollHeight') }, 300);

        getMessageText = function () {
            var $message_input,$messagesInput, messageInput;
            $message_input = $('.message_input');

            //check for empty text
            if ($message_input.val().trim() === '') {
              return;
            }
            $("#response").scrollTop($("#response").height());
             $messagesInput = $('.messages'); 
             message_side = message_side ===  'right' ? 'left' : 'right';

             messageInput = new Message({
                                     text: $message_input.val(),
                                     message_side: message_side
                                  });
                        
              messageInput.draw();
              $messagesInput.animate({ scrollTop: $messagesInput.prop('scrollHeight') }, 300);

            return $message_input.val();
        };
        sendMessage = function (text) {
                var $messages, message;
                $.ajax({
                      type: "POST",
                      url: baseUrl + "query?v=20150910",
                      contentType: "application/json; charset=utf-8",
                      dataType: "json",
                      headers: {
                          "Authorization": "Bearer " + accessToken
                      },
                      data: JSON.stringify({ query: text, lang: "en", sessionId: "somerandomthing" }),
                      success: function(data) {
                        respText = data.result.fulfillment.speech;                      
                        console.log("Res: " + respText);

                        $("#response").scrollTop($("#response").height());
                              $('.message_input').val('');
                                $messages = $('.messages'); 
                                message_side = message_side === 'left' ? 'right' : 'left';

                              message = new Message({
                                                           text: respText,
                                                           message_side: message_side
                                        });

                                message.draw();
                                return $messages.animate({ scrollTop: $messages.prop('scrollHeight') }, 300);
                              },
                     error: function() {
                    }
        });

        };
        $('.send_message').click(function (e) {
            return sendMessage(getMessageText());
        });
        $('.message_input').keyup(function (e) {
            if (e.which === 13) {
                return sendMessage(getMessageText());
            }
        });
        sendMessage();
        setTimeout(function () {
            return sendMessage();
        }, 1000);
        return setTimeout(function () {
            return sendMessage();
        }, 2000);
    });
    
}.call(this));



		    //retrieve the value from the clicked button 
			optionSelect = function (option) {
			//option button id (btnYes or btnNo)             
			 var value = document.getElementById(option.id);
			//get the value from the button Yes or No
			 var finalValue = value.getAttribute("value");  
			 setInput(finalValue);
			};  

			//send the text from input value form the textfield to the agent
			setInput= function (text) {
			//Yes or No value passed from button is put in the message box
			$('.message_input').val(text);  
			//Yes or No value passed from button is put in the message box
			return sendMessage(getMessageText()); //send message
			};           