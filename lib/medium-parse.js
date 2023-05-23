const fs = require('fs');
const xml2js = require('xml2js');

const parser = new xml2js.Parser();

/**
 * @param {string} profile - enter username if customURL is
    * false. Otherwise enter the domain.
 * @param {bool} [profile] - set `true` if the medium site 
    * has custom domain.
 */
async function parse(profile, customURL=false) {

    // FIXME: customURL not working. Error in Fetch - Timeout `UND_ERR_CONNECT_TIMEOUT`
    const url = (
        customURL ? 
        `https://${profile}/feed` : 
        `https://medium.com/@${profile}/feed`
    );

    let res;
    try {
        res = await fetch(url);
    } catch (e) {
        console.log("failed to fetch.");
        throw e;
    }
    let xml = await res.text();

    let out = await parseXML(xml);
    return out;
}

/**
 * @param {string} xml - send the xml data as string
 */
async function parseXML(xml) {
    let results;
    xml2js.parseString(xml, {explicitArray : false}, function (err, result) {
        results = result;
    });
    let out = extractImageFromContent(results);
    return out;
}

async function extractImageFromContent(parsedXml) {
    let out = parsedXml.rss.channel.item.map((item) => {
        let {
            title,
            link,
            guid,
            category,
            pubDate
        } = item;

        let reg = /<figure><img [^>]*src="(?<url>[^"]+)"[^>]* \/><\/figure>/m;
        let url = item["content:encoded"].match(reg);
        return {title, link, guid, category, pubDate, url: url.groups.url}
    })
    parsedXml.rss.channel.item = out;
    return parsedXml;
}

module.exports = {
    parse,
    parseXML,
}
/* (async function() {
    let out = await parse('kirito174', customURL=false);
    console.dir(out);
})(); */
