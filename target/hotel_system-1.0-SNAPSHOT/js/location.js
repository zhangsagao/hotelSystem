var current = {
    prov:"",
    ci:"",
    dis:""
}

function showProvince() {
    var thisProvince = $("#province");
    var provinceLength = province.length;
    console.log(provinceLength);
    console.log(thisProvince.val());
    for(var i = 0;i<provinceLength;i++){
        var provinceName = province[i].name;
        var provinceOption = "<option value="+i+" name='"+provinceName+"'>"+provinceName+"</option>";
        thisProvince.append(provinceOption);
    }
}

function showCity(thisProvince) {
    var thisCity = $("#city");
    var thisDistinct = $("#distinct");
    var val = thisProvince.options[thisProvince.selectedIndex].value;
    if(val!=current.prov){
        current.prov=val;
        thisCity.empty();
        thisCity.append($("<option>=请选择城市=</option>"))
        thisDistinct.empty();
        thisDistinct.append($("<option>=请选择县区=</option>"));
    }
    // console.log(val);
    if(val!=null){
        var cityLength = province[val]["city"].length;
        for(var i=0;i<cityLength;i++){
            var cityName = province[val]["city"][i].name;
            var cityOption = "<option value="+i+" name='"+cityName+"'>"+cityName+"</option>";
            thisCity.append(cityOption);
        }
    }
}

function showDistinct(thisCity) {
    var thisDistinct = $("#distinct");
    var val = thisCity.options[thisCity.selectedIndex].value;
    if(val!=current.ci){
        current.ci=val;
        thisDistinct.empty();
        thisDistinct.append($("<option>=请选择县区=</option>"));
    }
    if(val!=null){
        var distinctLength = province[current.prov]["city"][val].districtAndCounty.length;
        for(var i=0;i<distinctLength;i++){
            var distinctName = province[current.prov]["city"][current.ci].districtAndCounty[i];
            var distinctOption = "<option value="+i+" name='"+distinctName+"'>"+distinctName+"</option>";
            thisDistinct.append(distinctOption)
        }
    }
}