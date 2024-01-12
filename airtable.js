       document.addEventListener("DOMContentLoaded", function() {
    fetchAllDataFromHeroku().then(() => {
        fetchMakesFromHeroku(); // Fetch makes after all data is fetched
    }).catch(error => {
        console.error('Error loading data:', error);
    });
});
        document.getElementById("Make").addEventListener("change", makemodel);
        document.getElementById("Model").addEventListener("change", function() {
    otherParameters();  // Handle package-related updates
    fetchYearsAndUpdateDropdown();  // Fetch and update years
});
        document.getElementById("Front-2-windows").addEventListener("click", Front2Windows);
        document.getElementById("Back-half").addEventListener("click", BackHalf);
        document.getElementById("Full-Car-All-Doors-Back").addEventListener("click", FullCarAllDoorsandBack);
        document.getElementById("Windshield-as-a-Bundle").addEventListener("click", WindshieldAsaBundle);
        document.getElementById("Windshield-Alone").addEventListener("click", WindshieldAlone);
        document.getElementById("Full-Car-plus-Windshield-at-Bundle-Price").addEventListener("click", FullCarPlusWindshield);
        document.getElementById("Single-door-window").addEventListener("click", SingleDoorWindow);
        document.getElementById("Sun-Strip").addEventListener("click", SunStrip);
        document.getElementById("Panoramic-Sunroof").addEventListener("click", PanoramicSunroof);
        document.getElementById("Double-Sunroof").addEventListener("click", DoubleSunroof);
        document.getElementById("Sunroof").addEventListener("click", Sunroof);
        
        let make_list = []; //make an empty list of makes
        let model_list = []; //make an empty list of models
        let year_list = [];  //make an empty list of years
        var json_list=[];
        var json = {};
        let modelfilter=[];
        let yearfilter = [];
        var globalData = [];
        
        function fetchAllDataFromHeroku() {
    return fetch('https://sleepy-caverns-17387-8264861ec645.herokuapp.com/api/data')
        .then(response => response.json())
        .then(data => {
            globalData = data; // Store all data in globalData
        })
        .catch(error => {
            console.error('Error fetching all data:', error);
        });
}

// Function to fetch makes from Heroku
function fetchMakesFromHeroku() {
    return fetch('https://sleepy-caverns-17387-8264861ec645.herokuapp.com/api/makes')
        .then(response => response.json())
        .then(makes => {
            populateMakesDropdown(makes);
        })
        .catch(error => {
            console.error('Error fetching makes:', error);
        });
}
         
        function populateMakesDropdown(makes) {
    var makeDropdown = document.getElementById("Make");
    makeDropdown.innerHTML = ''; // Clear existing options

     makes.sort(); // Sort makes alphabetically
    makes.forEach(make => {
        var option = document.createElement("option");
        option.value = make;
        option.textContent = make;
        makeDropdown.appendChild(option);
    });

    // Trigger update for models based on the first make
    makemodel();
}

              
        function makemodel() {
    var selectedMake = document.getElementById("Make").value;
    fetch(`https://sleepy-caverns-17387-8264861ec645.herokuapp.com/api/models?make=${selectedMake}`)
        .then(response => response.json())
        .then(models => {
            populateModelsDropdown(models);
        })
        .catch(error => console.error('Error fetching models:', error));
}

function populateModelsDropdown(models) {
    var modelDropdown = document.getElementById("Model");
    modelDropdown.innerHTML = '';
    
    models.sort(); // Sort models alphabetically
    models.forEach(model => {
        var option = document.createElement("option");
        option.value = model;
        option.textContent = model;
        modelDropdown.appendChild(option);
    });

    // Trigger update for years based on the first model
    fetchYearsAndUpdateDropdown();
}

function fetchYearsAndUpdateDropdown() {
    var selectedMake = document.getElementById("Make").value;
    var selectedModel = document.getElementById("Model").value;
    fetch(`https://sleepy-caverns-17387-8264861ec645.herokuapp.com/api/years?make=${selectedMake}&model=${selectedModel}`)
        .then(response => response.json())
        .then(years => {
            populateYearsDropdown(years);
        })
        .catch(error => console.error('Error fetching years:', error));
}

function populateYearsDropdown(years) {
    var yearDropdown = document.getElementById("Year");
    yearDropdown.innerHTML = '';
    
    years.sort((a, b) => b - a); // Sort years in descending order
    years.forEach(year => {
        var option = document.createElement("option");
        option.value = year;
        option.textContent = year;
        yearDropdown.appendChild(option);
    });
}


// Initial setup
document.getElementById("Make").addEventListener("change", makemodel);

      function otherParameters(){
       var Front2Windows=[];
       var BackHalf=[];
       var FullCarAllDoorsandBack=[];
       var WindshieldAsaBundle=[];
       var WindshieldAlone=[];
       var FullCarPlusWindshield=[];
       var SingleDoorWindow=[];
       var SunStrip=[];
       var PanoramicSunroof=[];
       var DoubleSunroof=[];
       var Sunroof=[];
       
       
       var selectedMake = document.getElementById("Make").value;
    var selectedModel = document.getElementById("Model").value;

    var parametersModel = globalData.filter(function (el) {
        return el.Make === selectedMake && el.Model === selectedModel;
    });
    
     for (let item in parametersModel) {
     console.log(parametersModel[item].Package1);
     Front2Windows.push(parametersModel[item].Package1,parametersModel[item].Package1Ceramic,parametersModel[item].Package1i3Ceramic);
     BackHalf.push(parametersModel[item].Package2,parametersModel[item].Package2Ceramic,parametersModel[item].Package2i3Ceramic);
     FullCarAllDoorsandBack.push(parametersModel[item].Package3,parametersModel[item].Package3Ceramic,parametersModel[item].Package3i3Ceramic);
     WindshieldAsaBundle.push(parametersModel[item].Package4,parametersModel[item].Package4Ceramic,parametersModel[item].Package4i3Ceramic);
      WindshieldAlone.push(parametersModel[item].Package5,parametersModel[item].Package5Ceramic,parametersModel[item].Package5i3Ceramic);
      FullCarPlusWindshield.push(parametersModel[item].Package6,parametersModel[item].Package6Ceramic,parametersModel[item].Package6i3Ceramic);
      SingleDoorWindow.push(parametersModel[item].Package7,parametersModel[item].Package7Ceramic,parametersModel[item].Package7i3Ceramic);
      SunStrip.push(parametersModel[item].Package8,parametersModel[item].Package8Ceramic,parametersModel[item].Package8i3Ceramic);
      PanoramicSunroof.push(parametersModel[item].Package9,parametersModel[item].Package9Ceramic,parametersModel[item].Package9i3Ceramic);
      DoubleSunroof.push(parametersModel[item].Package10,parametersModel[item].Package10Ceramic,parametersModel[item].Package10i3Ceramic);
     Sunroof.push(parametersModel[item].Package11Ceramic,parametersModel[item].Package11i3Ceramic);
     
     var minFront2Windows = Math.min(...Front2Windows);
     var minBackHalf = Math.min(...BackHalf);
     var minFullCarAllDoorsandBack = Math.min(...FullCarAllDoorsandBack);
     var minWindshieldAsaBundle = Math.min(...WindshieldAsaBundle);
     var minWindshieldAlone = Math.min(...WindshieldAlone);
     var minFullCarPlusWindshield = Math.min(...FullCarPlusWindshield);
     var minSingleDoorWindow = Math.min(...SingleDoorWindow);
     var minSunStrip = Math.min(...SunStrip);
     var minPanoramicSunroof = Math.min(...PanoramicSunroof);
     var minDoubleSunroof = Math.min(...DoubleSunroof);
     var minSunroof = Math.min(...Sunroof);
     console.log (minFront2Windows);
      document.getElementById("P2").innerHTML="Starting at $" + minFront2Windows;
      document.getElementById("P3").innerHTML="Starting at $" + minBackHalf;
      document.getElementById("P4").innerHTML="Starting at $" + minFullCarAllDoorsandBack;
      document.getElementById("P5").innerHTML="Starting at $" + minWindshieldAsaBundle;
      document.getElementById("P6").innerHTML="Starting at $" + minWindshieldAlone;
      document.getElementById("P7").innerHTML="Starting at $" + minFullCarPlusWindshield;
      document.getElementById("P8").innerHTML="Starting at $" + minSingleDoorWindow;
      document.getElementById("P9").innerHTML="Starting at $" + minSunStrip;
      document.getElementById("P10").innerHTML="Starting at $" + minPanoramicSunroof;
      document.getElementById("P11").innerHTML="Starting at $" + minDoubleSunroof;
      document.getElementById("P1").innerHTML="Starting at $" + minSunroof;
      
     //console.log(Front2Windows);
    }
    
    
    }
    let choice="";
    let filmtype=[];
    let standard=0;
    let ceramic=0;
    let multilayer=0;
    
    // Front2Windows
function Front2Windows() {
    var selectedMake = document.getElementById("Make").value;
    var selectedModel = document.getElementById("Model").value;
    var choice = "Front 2 Windows";
    var standard, ceramic, multilayer;

    globalData.forEach(function(entry) {
        if (entry.Make === selectedMake && entry.Model === selectedModel) {
            standard = entry.Package1;
            ceramic = entry.Package1Ceramic;
            multilayer = entry.Package1i3Ceramic;
        }
    });

    document.getElementById("SF").innerHTML = standard ? "$" + standard : "Not Available";
    document.getElementById("CF").innerHTML = ceramic ? "$" + ceramic : "Not Available";
    document.getElementById("MF").innerHTML = multilayer ? "$" + multilayer : "Not Available";
    document.getElementById("chosen-film").innerHTML = choice;
}
    
    // BackHalf
function BackHalf() {
    var selectedMake = document.getElementById("Make").value;
    var selectedModel = document.getElementById("Model").value;
    var choice = "Back Half";
    var standard, ceramic, multilayer;

    globalData.forEach(function(entry) {
        if (entry.Make === selectedMake && entry.Model === selectedModel) {
            standard = entry.Package2;
            ceramic = entry.Package2Ceramic;
            multilayer = entry.Package2i3Ceramic;
        }
    });

    document.getElementById("SF").innerHTML = standard ? "$" + standard : "Not Available";
    document.getElementById("CF").innerHTML = ceramic ? "$" + ceramic : "Not Available";
    document.getElementById("MF").innerHTML = multilayer ? "$" + multilayer : "Not Available";
    document.getElementById("chosen-film").innerHTML = choice;
}

// FullCarAllDoorsandBack
function FullCarAllDoorsandBack() {
    var selectedMake = document.getElementById("Make").value;
    var selectedModel = document.getElementById("Model").value;
    var choice = "Full Car All Doors and Back";
    var standard, ceramic, multilayer;

    globalData.forEach(function(entry) {
        if (entry.Make === selectedMake && entry.Model === selectedModel) {
            standard = entry.Package3;
            ceramic = entry.Package3Ceramic;
            multilayer = entry.Package3i3Ceramic;
        }
    });

    document.getElementById("SF").innerHTML = standard ? "$" + standard : "Not Available";
    document.getElementById("CF").innerHTML = ceramic ? "$" + ceramic : "Not Available";
    document.getElementById("MF").innerHTML = multilayer ? "$" + multilayer : "Not Available";
    document.getElementById("chosen-film").innerHTML = choice;
}

// WindshieldAsaBundle
function WindshieldAsaBundle() {
    var selectedMake = document.getElementById("Make").value;
    var selectedModel = document.getElementById("Model").value;
    var choice = "Windshield as a Bundle";
    var standard, ceramic, multilayer;

    globalData.forEach(function(entry) {
        if (entry.Make === selectedMake && entry.Model === selectedModel) {
            standard = entry.Package4;
            ceramic = entry.Package4Ceramic;
            multilayer = entry.Package4i3Ceramic;
        }
    });

    document.getElementById("SF").innerHTML = standard ? "$" + standard : "Not Available";
    document.getElementById("CF").innerHTML = ceramic ? "$" + ceramic : "Not Available";
    document.getElementById("MF").innerHTML = multilayer ? "$" + multilayer : "Not Available";
    document.getElementById("chosen-film").innerHTML = choice;
}

// WindshieldAlone
function WindshieldAlone() {
    var selectedMake = document.getElementById("Make").value;
    var selectedModel = document.getElementById("Model").value;
    var choice = "Windshield Alone";
    var standard, ceramic, multilayer;

    globalData.forEach(function(entry) {
        if (entry.Make === selectedMake && entry.Model === selectedModel) {
            standard = entry.Package5;
            ceramic = entry.Package5Ceramic;
            multilayer = entry.Package5i3Ceramic;
        }
    });

    document.getElementById("SF").innerHTML = standard ? "$" + standard : "Not Available";
    document.getElementById("CF").innerHTML = ceramic ? "$" + ceramic : "Not Available";
    document.getElementById("MF").innerHTML = multilayer ? "$" + multilayer : "Not Available";
    document.getElementById("chosen-film").innerHTML = choice;
}

// FullCarPlusWindshield
function FullCarPlusWindshield() {
    var selectedMake = document.getElementById("Make").value;
    var selectedModel = document.getElementById("Model").value;
    var choice = "Full Car plus Windshield";
    var standard, ceramic, multilayer;

    globalData.forEach(function(entry) {
        if (entry.Make === selectedMake && entry.Model === selectedModel) {
            standard = entry.Package6;
            ceramic = entry.Package6Ceramic;
            multilayer = entry.Package6i3Ceramic;
        }
    });

    document.getElementById("SF").innerHTML = standard ? "$" + standard : "Not Available";
    document.getElementById("CF").innerHTML = ceramic ? "$" + ceramic : "Not Available";
    document.getElementById("MF").innerHTML = multilayer ? "$" + multilayer : "Not Available";
    document.getElementById("chosen-film").innerHTML = choice;
}

// SingleDoorWindow
function SingleDoorWindow() {
    var selectedMake = document.getElementById("Make").value;
    var selectedModel = document.getElementById("Model").value;
    var choice = "Single Door Window";
    var standard, ceramic, multilayer;

    globalData.forEach(function(entry) {
        if (entry.Make === selectedMake && entry.Model === selectedModel) {
            standard = entry.Package7;
            ceramic = entry.Package7Ceramic;
            multilayer = entry.Package7i3Ceramic;
        }
    });

    document.getElementById("SF").innerHTML = standard ? "$" + standard : "Not Available";
    document.getElementById("CF").innerHTML = ceramic ? "$" + ceramic : "Not Available";
    document.getElementById("MF").innerHTML = multilayer ? "$" + multilayer : "Not Available";
    document.getElementById("chosen-film").innerHTML = choice;
}

// SunStrip
function SunStrip() {
    var selectedMake = document.getElementById("Make").value;
    var selectedModel = document.getElementById("Model").value;
    var choice = "Sun Strip";
    var standard, ceramic, multilayer;

    globalData.forEach(function(entry) {
        if (entry.Make === selectedMake && entry.Model === selectedModel) {
            standard = entry.Package8;
            ceramic = entry.Package8Ceramic;
            multilayer = entry.Package8i3Ceramic;
        }
    });

    document.getElementById("SF").innerHTML = standard ? "$" + standard : "Not Available";
    document.getElementById("CF").innerHTML = ceramic ? "$" + ceramic : "Not Available";
    document.getElementById("MF").innerHTML = multilayer ? "$" + multilayer : "Not Available";
    document.getElementById("chosen-film").innerHTML = choice;
}

// PanoramicSunroof
function PanoramicSunroof() {
    var selectedMake = document.getElementById("Make").value;
    var selectedModel = document.getElementById("Model").value;
    var choice = "Panoramic Sunroof";
    var standard, ceramic, multilayer;

    globalData.forEach(function(entry) {
        if (entry.Make === selectedMake && entry.Model === selectedModel) {
            standard = entry.Package9;
            ceramic = entry.Package9Ceramic;
            multilayer = entry.Package9i3Ceramic;
        }
    });

    document.getElementById("SF").innerHTML = standard ? "$" + standard : "Not Available";
    document.getElementById("CF").innerHTML = ceramic ? "$" + ceramic : "Not Available";
    document.getElementById("MF").innerHTML = multilayer ? "$" + multilayer : "Not Available";
    document.getElementById("chosen-film").innerHTML = choice;
}

// DoubleSunroof
function DoubleSunroof() {
    var selectedMake = document.getElementById("Make").value;
    var selectedModel = document.getElementById("Model").value;
    var choice = "Double Sunroof";
    var standard, ceramic, multilayer;

    globalData.forEach(function(entry) {
        if (entry.Make === selectedMake && entry.Model === selectedModel) {
            standard = entry.Package10;
            ceramic = entry.Package10Ceramic;
            multilayer = entry.Package10i3Ceramic;
        }
    });

    document.getElementById("SF").innerHTML = standard ? "$" + standard : "Not Available";
    document.getElementById("CF").innerHTML = ceramic ? "$" + ceramic : "Not Available";
    document.getElementById("MF").innerHTML = multilayer ? "$" + multilayer : "Not Available";
    document.getElementById("chosen-film").innerHTML = choice;
}

//Sunroof
    function Sunroof() {
    var selectedMake = document.getElementById("Make").value;
    var selectedModel = document.getElementById("Model").value;
    var choice = "Sunroof";
    var ceramic, multilayer;

    globalData.forEach(function(entry) {
        if (entry.Make === selectedMake && entry.Model === selectedModel) {
            // Since standard film is not available for Sunroof, we do not fetch it
            ceramic = entry.Package11Ceramic;
            multilayer = entry.Package11i3Ceramic;
        }
    });

    // Standard film is not available for Sunroof
    document.getElementById("SF").innerHTML = "Not Available";
    document.getElementById("CF").innerHTML = (ceramic || ceramic === 0) ? "$" + ceramic : "Not Available";
    document.getElementById("MF").innerHTML = (multilayer || multilayer === 0) ? "$" + multilayer : "Not Available";
    document.getElementById("chosen-film").innerHTML = choice;
}
       
             
                      
