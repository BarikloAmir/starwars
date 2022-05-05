//add comment
let url1 = 'https://swapi.dev/api/films/4';
let url2 = 'https://swapi.dev/api/films/5';
let url3 = 'https://swapi.dev/api/films/6';
let url4 = 'https://swapi.dev/api/films/1';
let url5 = 'https://swapi.dev/api/films/2';
let url6 = 'https://swapi.dev/api/films/3';

const url_List = [url1, url2, url3, url4, url5, url6];

var data_movie_list = [];
let home_html_code;
let home_html_code2;
(async() => {

    home_html_code2 = "<table>"
    home_html_code2 += "<tr style=\"color:blue;font-size:20px;\">"
    home_html_code2 += "<th >title</th>"
    home_html_code2 += "<th>episode id</th>"
    home_html_code2 += "<th>release date</th>"
    home_html_code2 += "<th>starships</th>"
    home_html_code2 += "</tr>"

    home_html_code = "<lu>"
    home_html_code += "<h1 style=\"color:blue;font-size:30px;\">title  episode_id  release_date link</h1>"
    for(let i = 0; i < url_List.length; i++){
        let data = await get_url(url_List[i]);
        data_movie_list.push(data);

        home_html_code += "<form onsubmit=\"return false;\">"
        home_html_code += "<p style=\"color:red;font-size:20px;\">"+data['title']+"  "+data['episode_id']+"  "+data['release_date']
        home_html_code += "<button id=\""+(i+1)+"\" class=\"btn\" onclick='starships_show(this.id)' >starships</button>"
        home_html_code += "</p></form>"

        home_html_code2 += "<tr>"
        home_html_code2 += "<td style=\"color:red;font-size:20px;\">"+data['title']+"</td>"
        home_html_code2 += "<td>"+data['episode_id']+"</td>"
        home_html_code2 += "<td>"+data['release_date']+"</td>"
        home_html_code2 += "<td><button id=\""+(i+1)+"\" class=\"btn\" onclick='starships_show(this.id)'>starships</button></td>"
        home_html_code2 += "</tr>"
    }
    // home_html_code += "</table>"
    home_html_code +="</lu>"

    document.getElementById("movie_content_box").innerHTML = home_html_code2


})();

let index=0;

async function starships_show(id) {

    index=0;

    let movie_id = id;

    starships_show_custom(movie_id,0)

    //console.log(index)

}

function back_home(){
    document.getElementById("movie_content_box").innerHTML = home_html_code2
}
async function starships_show_custom(movie_id, value) {
    index+=value;
    //alert(index)
    //alert(movie_id)
    let movie_data = data_movie_list[movie_id - 1];
    console.log(movie_data)
    let starship = movie_data["starships"];
    let html_code = "<h1>starships:</h1>"
    html_code += "<lu>"
    for (let i = index*5; i < starship.length; i++) {
        if (i-index*5==5){break;}
        //console.log(i)
        let data_starship = await get_url(starship[i])
        //data_starship_list.push(data_starship)
        html_code += "<form onsubmit=\"return false;\"><button class=\"btn_starship\" onclick=\"starship_data(\'" + starship[i] + "\')\" id=" + starship[i] + ">" + data_starship['name'] + "</button></form>";

    }

    if (index>0){
        html_code += "<button id=" + movie_id + " onclick=\"starships_show_custom(" + movie_id + "," + -1 + ")\" >prev page</button>"
    }
    html_code+= "<button onclick='back_home()'>home</button>"
    if (starship.length-index*5>5){
        html_code += "<button id=" + movie_id + " onclick=\"starships_show_custom(" + movie_id + "," + 1 + ")\" >next page</button>"
    }

    html_code += "</lu>"
    document.getElementById("movie_content_box").innerHTML = html_code
}


async function starship_data(starship_url) {//what is await

    let data = await get_url(starship_url);
    let html_code ="<h1>"+data['name']+"</h1>"
    html_code+="<lu>"
    html_code+= "<P style=\"color:black;\">model: "+data['model']+"<br></p>"
    html_code+= "<P style=\"color:black;\">manufacturer: "+data['manufacturer']+"<br></p>"
    html_code+= "<P style=\"color:black;\">cost_in_credits: "+data['cost_in_credits']+"<br></p>"
    html_code+= "<P style=\"color:black;\">length: "+data['length']+"<br></p>"
    html_code+= "<P style=\"color:black;\">max_atmosphering_speed: "+data['max_atmosphering_speed']+"<br></p>"
    html_code+= "<P style=\"color:black;\">crew: "+data['crew']+"<br></p>"
    html_code+= "<P style=\"color:black;\">passengers: "+data['passengers']+"<br></p>"
    html_code+= "<P style=\"color:black;\">cargo_capacity: "+data['cargo_capacity']+"<br></p>"
    html_code+= "<P style=\"color:black;\">consumables: "+data['consumables']+"<br></p>"
    html_code+= "<P style=\"color:black;\">hyperdrive_rating: "+data['hyperdrive_rating']+"<br></p>"
    html_code+= "<P style=\"color:black;\">MGLT: "+data['MGLT']+"<br></p>"

    html_code+= "<button onclick='back_home()'>home</button>"
    html_code+="<button onclick=\"starship_data_next_page(\'"+starship_url+"\')\" >next page</button>"
    html_code+="</lu>"

    document.getElementById("movie_content_box").innerHTML = html_code

}

async function starship_data_next_page(starship_url) {
    let data = await get_url(starship_url);
    let html_code = "<h1>" + data['name'] + "</h1>"
    html_code += "<lu>"
    html_code += "<P style=\"color:black;\">created: " + data['created'] + "<br></p>"
    html_code += "<P style=\"color:black;\">edited: " + data['edited'] + "<br></p>"
    html_code += "<P style=\"color:black;\">url: " + data['url'] + "<br></p>"
    html_code+= "<P style=\"color:black;\">starship_class: "+data['starship_class']+"<br></p>"
    html_code += "<h2 style=\"color:blue;\">pilots:<br></h2>"

    let pilots = data['pilots']
    console.log(pilots)
    for (let i in pilots){
        let pilot = await get_url(pilots[i]);
        let pilot_name = pilot['name'];
        //console.log(pilots[pilot_url])
        html_code+="<P style=\"color:black; font-size:10px;\";\">" + pilot_name+":("+pilots[i]+")" + "<br></p>"
        i+=1;
    }

    html_code += "<button onclick=\"starship_data(\'"+starship_url+"\')\">prev page</button>"
    html_code+= "<button onclick='back_home()'>home</button>"
    html_code += "</lu>"
    document.getElementById("movie_content_box").innerHTML = html_code

}

async function get_url(url){//change names and forms
    const response = await fetch(url);
    const jsonRes = await response.json();
    return jsonRes;
}


// document.getElementById("1").onclick = starships_show;
// document.getElementById("2").onclick = starships_show;
// document.getElementById("3").onclick = starships_show;
// document.getElementById("4").onclick = starships_show;
// document.getElementById("5").onclick = starships_show;
// document.getElementById("6").onclick = starships_show;
