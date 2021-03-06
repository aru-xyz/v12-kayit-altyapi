const Discord = require('discord.js');
const config = require('../config.json');

exports.run = async (message, args) => {

    /* variables:
    piece
    miaf
    serendia
    squad
    */
    try {

        if (!message.member.roles.cache.has(config.teyitci)) return message.reply('Yetersiz yetki!');  //eğer yetkisi yoksa dönüt mesajı attırıyoruz.

        const piece = message.mentions.members.first() || message.guild.members.cache.get(args[0]) //üyeyi çekiyoruz yani hem etiket hemde id ile olur.
        const miaf = args[1] //isim
        const serendia = args[2]  //yaş

        if (!piece) return message.channel.send(new Discord.MessageEmbed().setDescription(`Bir kullanıcı belirtmelisin. **Örnek: @Piece/424544845290536970**`).setFooter(`Serendia Squad - Kayıt Sistemi`).setColor("RANDOM").setTimestamp());
        if (!miaf) return message.channel.send(new Discord.MessageEmbed().setDescription(`İsim belirtmelisin. **Örnek: Piece**`).setFooter(`Serendia Squad - Kayıt Sistemi`).setColor("RANDOM").setTimestamp());
        if (!serendia) return message.channel.send(new Discord.MessageEmbed().setDescription(`Yaş belirtmelisin. **Örnek: 17**`).setFooter(`Serendia Squad - Kayıt Sistemi`).setColor("RANDOM").setTimestamp());

        const miaff = /(a|b|c|d|e|f|g|ğ|j|k|l|m|n|o|p|r|s|ş|t|u|v|y|z)/i
        const serendiaa = /(1|2|3|4|5|6|7|8|9|0)/
        if (miaf.match(miaff)) return message.channel.send(`**Sadece** isim belirtmelisin.`)
        if (serendia.match(serendiaa)) return message.channel.send(`**Sadece** yaş belirtmelisin.`)

        message.channel.send(new Discord.MessageEmbed().setDescription(`**__Kayıt İşlemi Başarılı__**\n\n🤠 Kayıt Edilen Kişi: ${piece}\n🤠 Kayıt Yapan Yetkili: ${message.author}\n🤠 Kayıt İşleminde Verilen Rol: <@&${config.kizRol}>\n🤠 Kayıt İşleminde Alınan Rol: <@&${config.kayitsiz}>`).setFooter(`Serendia Squad - Kayıt Sistemi`).setColor("RANDOM").setTimestamp())
        piece.setNickname(`${miaf} | ${serendia}`).catch(e => message.channel.send(`Benden Üstte Olduğu İçin İsmini Değiştiremedim.`))
        await piece.roles.add(config.kizRol) //eğer başka rolleriniz de varsa onları da ek olarak congif.json da belirtip alt satıra kopyalayıp yapın.
        await piece.roles.remove(config.kayitsiz)
        message.guild.channels.cache.get(config.genelChat).send(`${piece} aramıza katıldı. Sunucumuz şuanda **${message.guild.memberCount}** kişi!`)

    } catch (e) {
        message.channel.send(`Kayıt Yetkim veya Rolüm Yok`)
    }

};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["k", "kadın", "bayan"],
    permLevel: 0
};
exports.help = {
    name: 'kiz'
};