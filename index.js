
const DISEASES_TABLE = {
    "s0": {
        "name": "Healthy", 
        "files": ["s0-0.jpg", "s0-1.jpg"], 
        "len": 2, 
        "ans": 0, 
        "explain": 
            `Healthy teeth and gums, no obvious dental problems, which means the person 
            takes good care of the teeth and gums. Brushing teeth twice a day, flossing, 
            and regular dental check-ups are the best ways to prevent dental problems.`
    },
    "s1": {
        "name": "Tooth decay", 
        "files": ["s1-0.jpg", "s1-1.jpg", "s1-2.jpg", "s1-3.jpg", "s1-4.jpg", "s1-5.jpg"], 
        "len": 6, 
        "ans": 1, 
        "explain": 
            `Sometimes erosion on the surface of the tooth may be minimal, but the inside is already riddled with holes.
            There are multiple stages of tooth decay, generally judged by the depth of infection: to enamel, to dentin, to pulp
            In the early stages it can still be treated with simple methods, such as fillings. However, if the infection has spread to the pulp of the tooth, formal surgery is required to treat it. 
            May cause dental abscesses as well. `
    }, 
    "s2": {
        "name": "Periodontal diseases", 
        "files": ["s2-0.jpg", "s2-1.jpg", "s2-2.jpg", "s2-3.jpg"], 
        "len": 4, 
        "ans": 2, 
        "explain": 
            `Periodontal disease can be divided into multiple stages.
            Accumulation of stains is the main cause of periodontal disease
            Severe periodontal disease may require surgery that extends to the bone to treat it
            Periodontal disease is generally irreversible and therefore requires special attention`
    },
    "s3": {
        "name": "Recurrent aphthous ulcers (RAU)", 
        "files": ["s3-0.jpg", "s3-1.jpg", "s3-2.jpg"], 
        "len": 3, 
        "ans": 3, 
        "explain":
            `Recurrent aphthous ulcers(RAU) sound serious, but in reality they are mouth ulcers that the average person also suffers from occasionally.
            The cause of RAU is not clear, but it is mostly linked to endocrine and nutritional factors.
            But it's not a problem to be underestimated. Severe RAU can be very painful.
            In addition, the early symptoms of oral cancer and dental abscesses are somewhat similar to RAUs, so don't take them lightly!
            Early RAUs can heal on their own, but there are also creams that can be used to speed up the healing process.`
    },
    "s4": {
        "name": "Dental abscess", 
        "files": ["s4-0.jpg", "s4-1.jpg", "s4-2.jpg"], 
        "len": 3, 
        "ans": 4, 
        "explain": 
            `A dental abscess is formed by pus that accumulates from a bacterial infection in the tissue
            There are many causes, such as severe tooth decay
            If the abscess is visible to the naked eye, it is advisable to consult a doctor immediately.
            The first symptoms of a dental abscess are sometimes similar to those of RAU and oral cancer.`
    },
    "s5": {
        "name": "Pericoronitis", 
        "files": ["s5-0.jpg", "s5-1.jpg", "s5-2.jpg"], 
        "len": 3, 
        "ans": 5, 
        "explain": 
            `Pericoronitis is an inflammation of the soft tissues surrounding the crown of the tooth
            In fact, all teeth can develop pericoronitis, but it is common in wisdom teeth
            The essence is similar to tooth decay in that it is an infection caused by leftover food debris. Therefore, when tooth decay occurs around a wisdom tooth, you need to watch out for pericoronitis.
            The best way to prevent this, besides brushing your teeth regularly, is to remove your wisdom teeth.
            This can be treated with antibiotics, but if the condition is serious, surgery may be needed to remove the infected tissue.`
    }
}

var ans = -1;
var selected = -1;

function set_button() {
    let s = $(".s")
    s.data("clicked", 0);
    s.click( (event) => {
        reset();
        selected = event.originalEvent.currentTarget.id[1];

        let current = $(event.currentTarget);
        const clicked = current.data("clicked");
        current.css({
            "color": clicked ? "black" : "white", 
            "background-color": clicked ? "lightblue" : "darkblue"
        });
        current.data("clicked", !clicked);

        $("#submit").css("display", "block");
    });

    $("#next").click( (event) => {
        event.stopPropagation();
        make_new_question();
    });

    $("#submit").click((event) => {
        event.stopPropagation();
        check_answer();
    });

    $(document).click(function(event) {
        var target = $(event.target);
        if (!target.closest('#explain').length) {
            // 如果点击的不是#yourElement元素或其子元素
            // 那么关闭#yourElement元素
            $('#explain').hide();
        }
    });
}


function make_new_question() {
    const [s_serial_num, s_file_serial_num] = generate_and_set_symptom();
    $("#left img").attr("src", `./materials/s${s_serial_num}-${s_file_serial_num}.jpg`);
    // console.log(s_serial_num, s_file_serial_num);
    ans = DISEASES_TABLE[`s${s_serial_num}`]["ans"];
    reset();
}

function generate_and_set_symptom() {
    const s_serial_num = Math.floor(Math.random() * 6);
    const s_file_serial_num = Math.floor(Math.random() * DISEASES_TABLE[`s${s_serial_num}`]["len"]);

    return [s_serial_num, s_file_serial_num];
    // return [5, 0];
    // const interval_id = setInterval( () => {
    //     const s_serial_num = Math.floor(Math.random() * 6);
    //     const s_file_serial_num = Math.floor(Math.random() * DISEASES_TABLE[`s${s_serial_num}`]["len"]);
    //     img.attr("src", `./materials/s${s_serial_num}-${s_file_serial_num}.jpg`);
    // }, 
    // 1000);
    // img.click( () => {
    //     clearInterval(interval_id);
    // });
}


function check_answer() {
    show_explain(selected == ans);
    $("#submit").css("display", "none");
    $("#next").css("display", "block");
}

function show_explain(is_correct) {
    let explain = $("#explain");
    explain.css("display", "block");

    explain.find("span").first().text(is_correct ? "Correct!" : "Wrong!");
    explain.find("span").first().css("color", is_correct ? "lightgreen" : "red")

    explain.find("span").eq(1).text("Answer: " + DISEASES_TABLE[`s${ans}`]["name"]);
    explain.find("p").first().html(DISEASES_TABLE[`s${ans}`]["explain"].replace(/\n/g, "<br><br>"));
}

function reset() {
    let s = $(".s");
    s.data("clicked", 0);
    s.css({
        "color": "black", 
        "background-color": "lightblue"
    });
    $("#submit").css("display", "none");
    $("#next").css("display", "none");
    $("#explain").css("display", "none");
}

function main() {
    set_button();
    make_new_question();
}


window.onload = main;