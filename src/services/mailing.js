import mailer from 'nodemailer';
import config from '../config/config.js';

export default class MailingService {
    constructor(){
        //logica a implementar
        this.client= mailer.createTransport({
            service:config.mailing.SERVICE,
            host: config.mailing.HOST,
            port:587,
            auth:{
                user: config.mailing.USER,
                pass: config.mailing.PASSWORD
            }
        })
    }

    sendSimpleMail = async({from, to, subject, html, attachments=[]})=>{
        let result =  await this.client.sendMail({
            from,
            to,
            subject,
            html,
            attachments
        })
        console.log(result);//se va
        return result
    }
}