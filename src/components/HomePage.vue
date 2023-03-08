<template>
    <div class="container-fluid m-0 p-0">
        <div id="home-page" class="full-height p-4">
            <div class="container">
                <div class="row pb-5">

                    <div class="col-lg-6 pt-4 my-auto">
                        <div class="text-center mb-3 d-block d-lg-none">
                            <h1 class="display-3">{{ title }}</h1>
                            <h3>Encontra o seu Mundo</h3>
                        </div>
                        <img id="iphone-img" src="../assets/travelTreasuryiPhone.png" class="img-fluid">
                    </div>

                    <div class="col-lg-6 my-auto pt-4">
                        <div class="text-center mb-3 d-none d-lg-block">
                            <h1 class="display-3">{{ title }}</h1>
                            <h3>Encontra o seu Mundo</h3>
                        </div>

                        <div class="border p-3 p-md-5 bg-white rounded shadow blacker" >
                            <h2>Brevemente</h2>
                            <form @submit.prevent="addEmail(email)">
                                <div class="form-group">
                                    <label for="emailSignup">Reserve a sua conta agora, vamos contactar em breve</label>
                                    <input v-model="email" 
                                           id="emailSignup" 
                                           type="email" 
                                           placeholder="Insere o seu email" 
                                           class="form-control"
                                    >
                                    <small id="emailhelp" class="form-text text-muted">Partilhamos a sua conta de email</small>
                                    <br>
                                    <button type="submit" class="btn btn-success mt-3">Submter a Lista de Espera</button>
                                    <div class="mt-4">
                                        <p class="m-0">{{ message }}</p>
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div id="available" class="p-2">
                            <h4 class="text-center mb-2 mt-3 text-light">
                                Disponibilizados no
                            </h4>
                            <div class="row">
                                <div class="col my-auto">
                                    <img src="../assets/download_apple.png" class="float-right img-fluid app_store_img">
                                </div>
                                <div class="col my-auto">
                                    <img src="../assets/download_google.png" class="float-left img-fluid app_store_img">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div id="about" class="bg-light p-3 p-md-5">
            <div class="row">
                <div class="col-lg">
                    <img src="../assets/icons/app.svg" height="120" class="m-4">
                    <h5 class="ml-md-4 mr-md-4">
                        Planeia a sua próxima aventura definindo um orçamento de gastos diários.
                        Facilitamos a divisão de suas despesas por categoria, dando-lhe mais tempo para planejar as coisas 
                        importantes!
                    </h5>
                </div>
                <div class="col-lg">
                    <img src="../assets/icons/piggy-bank.svg" height="120" class="m-4">
                    <h5 class="ml-md-4 mr-md-4">
                        Use o aplicativo para rastrear quanto dinheiro você economizou em suas viagens
                        meta total orçada. Saiba exatamente quanto mais você precisa economizar,
                        e quanto tempo você ainda tem para economizar.
                    </h5>
                </div>
                <div class="col-lg">
                    <img src="../assets/icons/passport.svg" height="120" class="m-4">
                    <h5 class="ml-md-4 mr-md-4"> 
                        Quando chegar o dia da sua viagem, tenha a tranquilidade de saber que
                        planejou suas despesas. Nunca mais se preocupe com dinheiro em uma viagem!
                    </h5>
                </div>
            </div>
        </div>

        <div id="contact" class="p-4">

            <div class="row justify-content-center mt-3 mb-3">
                <div v-if="show_contact == true" class="col-lg-4">
                    <h2>Entre em contacto connosco</h2>
                    <p>Preenche a informacao para podermos a contactar</p>

                    <div v-if="contact_notice != ''" class="alert alert-warning">
                        Tem um problema de submissao de informacao. {{contact_notice}}
                    </div>

                    <form @submit.prevent="sendContactMessage()"> 
                        <div class="form-group text-left">
                            <input
                                v-model="contact_email" 
                                type="email" 
                                class="form-control" 
                                placeholder="Insere o seu email"
                            />
                            <textarea v-model="contact_message" 
                                      class="form-control mt-3" 
                                      placeholder="Insere a sua mensagem" 
                                      rows="5"
                            ></textarea>
                        </div>
                        <br>
                        <button type="submit" class="btn btn-primary">Envie a Mensagem</button>
                    </form>
                </div>

                <div v-else>
                    <h3>Mensagem enviada com sucesso!</h3>
                    <p>Obrigado por entrar em contato conosco, retornaremos o mais breve possível.</p>
                </div>
            </div>
            
        </div>

        <div id="footer" class="p-4">
            <footer class="text-light p-4">
                <a href="https://www.youtube.com/1manstartup" target="_blank" class="text-warning">Build This App</a> |
                <a href="#" class="text-warning">Privacy Policy</a>
                <br>
                <small>&copy; 2020, TravelTreasury.app</small>
            </footer>
        </div>
    </div>
  </template>
  
  <script>

  import { Auth } from '@/firebase/auth';
 
  export default {
    data() {
        return {
            title: 'Travel Treasury Lda',
            email: '',
            message: '',
            contact_email: '',
            contact_message: '',
            contact_notice: '',
            show_contact: true
        }
    },
    methods: {
        async addEmail(email) {
            var noticeMessage = "🎉 Your account has been reserved 🎉"
            await Auth.createUserWithEmailAndPassword(email, this.randomPassword(10)).catch(function(error)
            {
                //console.log(error.code);
                if (error.code === "auth/email-already-in-use") {
                    noticeMessage = error.message;
                }
            });
            this.message = noticeMessage;
            this.email = '';
        },
        randomPassword(length)
        {
            var chars = "abcdefghijklmnopqrstuvwxyz!@#$%^&*()-+<>ABCDEFGHIJKLMNOP1234567890";
            var password = "";
            
            for(var x=0; x<length; x++)
            {
                var i = Math.floor(Math.random() * chars.length);
                password += chars.charAt(i);
            }

            return password;
        },
        sendContactMessage()
        {
            if(!this.validEmail(this.contact_email))
            {
                this.contact_notice = 'Email inválido';
            }
            else
            {
                //sendEmail(this.contact_email, this.message);

                
                const url = `https://server-side-send-email.herokuapp.com/sendEmail?email_from=${this.contact_email}&message=${this.contact_message}`
                const requestOptions = {
                method: "GET",
                mode: 'cors',
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
                    "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
                    "Content-Type": "application/json"
                    }
                };
                fetch(url, requestOptions);
                this.show_contact = false;
                
            }
        },
        validEmail(email) {
            var re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            return re.test(email);
        }
    }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
    #home-page
    {
        background-color: #92D2;
        background: url('../assets/teste-gif.gif') no-repeat center center;
        -webkit-background-size: cover;
        -moz-background-size: cover;
        -o-background-size: cover;
        background-size: cover;
        color: #fff;
    }
    #iphone-img
    {
        max-height: 80vh;
    }
    .blacker
    {
        color: black;
    }


    #about
    {
        min-height: 40vh;
    }

    #contact
    {
        background-color: #57AEAF;
    }

    #footer {
         background-color: #252223;
    }
  </style>
  