// data variable
let basearr=[],basedata={},dp,mediaQuery,
    COL_LAT = 'lat',
    COL_LONG = 'lng',
    filter={};

let variable_collection ={
    District:{
        text: 'District',
        id: 'District',
        statistic: undefined,
    },
    County:{
        text: 'County',
        id: 'County',
        statistic: undefined,
    },
    DataType:{
        text: 'Project',
        id: 'DataType',
        statistic: 'group',
    },
    Highway:{
        text: 'Highway',
        id: 'Highway',
        statistic: undefined,
    },
    CCSJ:{
        text: 'CCSJ',
        id: 'CCSJ',
        statistic: undefined,
    },
    ConcreteCAT:{
        text: 'Concrete CAT',
        id: 'ConcreteCAT',
        statistic: undefined,
    },
    ConstYear:{
        text: 'Construction Year',
        id: 'ConstYear',
        statistic: 'date',
    },
    Direction:{
        text: 'Direction',
        id: 'Direction',
        statistic: 'category',
        hide: true,
    },

    Drainage:{
        text: 'Drainage',
        id: 'Drainage',
        statistic: undefined,
    },
    GPSStart:{
        type:'gps',
        text: 'GPS (Start)',
        id: 'GPSStart',
        statistic: undefined,
        hide: true,
    },
    GPSEnd:{
        type:'gps',
        text: 'GPS (End)',
        id: 'GPSEnd',
        statistic: undefined,
        hide: true,
    },
    HorizontalAlign:{
        text: 'Horizontal Alignment',
        id: 'HorizontalAlign',
        statistic: 'category',
    },
    NoOFLanes:{
        text: 'No. of Lanes (Both Directions)',
        id: 'NoOFLanes',
        statistic: 'number',
    },
    PavementType:{
        text: 'Pavement Type',
        id: 'PavementType',
        statistic: 'category',
    },
    RefMarker:{
        text: 'Reference Marker',
        id: 'RefMarker',
        statistic: undefined,
    },
    ShoulderType:{
        text: 'Shoulder Type',
        id: 'ShoulderType',
        statistic: 'category',
    },
    SlabThickness:{
        text: 'Slab Thickness (in.)',
        id: 'SlabThickness',
        statistic: 'number',
    },
    Surfacetexture:{
        text: 'Surface Texture',
        id: 'Surfacetexture',
        statistic: 'category',
    },
    VerticalAlign:{
        text: 'Vertical Alignment',
        id: 'VerticalAlign',
        statistic: 'category',
    }
};
let arr_variable_collection =[];
Object.keys(variable_collection).forEach(d=>{if (!variable_collection[d].hide) arr_variable_collection.push(variable_collection[d])});
let project_collection ={
    CRCP: {
        text:"CRCP",
        id:"CRCP",
        sub: ["Level 1 Sections","General Sections"]
    },
    CPCD: {
        text:"CPCD",
        id:"CPCD",
        sub: ["CPCD"]
    },
    ExperimentalSections: {
        text:"Experimental Sections",
        id:"ExperimentalSections",
        sub: ["Coarse Aggregate Effects","LTPP Sections","Steel Percentage Effects","Construction Season Effects"]
    },
    SpecialSections: {
        text:"Special Sections",
        id:"Special Sections",
        sub: ["Fast Track Pavement","Bonded Overlay","Unbonded Overlay","Whitetopping","Precast Pavement","Cast-in-Place Prestressed","Recycled Concrete Pavement","RCC Pavement"]
    }
};
let project_feature = {
    "Level 1 Sections": ["Deflections","LTE","Cracks","Pictures"],
    "all":["Plans","Reports","Pictures"]
}
let project_feature_collection = {
    Deflections:{
        text: "Deflections",
        id: "Deflections",
        show: queryfromsource
    },
    LTE:{
        text: "Load Transfer Efficiency",
        id: "LTE",
        show: queryfromsource
    },
    Cracks:{
        text: "Crack Information",
        id: "Cracks",
        show: queryfromsource
    },
    Pictures:{
        text: "Pictures",
        id: "Pictures",
        show: queryfromsource
    },
    Plans:{
        text: "Plans",
        id: "Plans",
        show: queryfromsource
    },
    Reports:{
        text: "Reports",
        id: "Reports",
        show: queryfromsource
    }
}

let filters =[];
// map

let us,us_dis;
let map_conf ={
    margin: {top: 0, right: 0, bottom: 0, left: 0},
    width: window.innerWidth,
    height: window.innerHeight,
    scalezoom: 1,
    widthView: function(){return this.width*this.scalezoom},
    heightView: function(){return this.height*this.scalezoom},
    widthG: function(){return this.widthView()-this.margin.left-this.margin.right},
    heightG: function(){return this.heightView()-this.margin.top-this.margin.bottom},
    },
    plotCountyOption = true;
// menu

let schemaSvg_option = {
    margin: {top: 20, right: 10, bottom: 20, left: 10},
    width: 370,
    height: 100,
    scalezoom: 1,
    widthView: function(){return this.width*this.scalezoom},
    heightView: function(){return this.height*this.scalezoom},
    widthG: function(){return this.widthView()-this.margin.left-this.margin.right},
    heightG: function(){return this.heightView()-this.margin.top-this.margin.bottom},
    barcolor: '#000000',
};

// let Colors = {};
// Colors.names = {
//     aqua: "#00ffff",
//     azure: "#f0ffff",
//     beige: "#f5f5dc",
//     black: "#000000",
//     blue: "#0000ff",
//     brown: "#a52a2a",
//     cyan: "#00ffff",
//     darkblue: "#00008b",
//     darkcyan: "#008b8b",
//     darkgrey: "#a9a9a9",
//     darkgreen: "#006400",
//     darkkhaki: "#bdb76b",
//     darkmagenta: "#8b008b",
//     darkolivegreen: "#556b2f",
//     darkorange: "#ff8c00",
//     darkorchid: "#9932cc",
//     darkred: "#8b0000",
//     darksalmon: "#e9967a",
//     darkviolet: "#9400d3",
//     fuchsia: "#ff00ff",
//     gold: "#ffd700",
//     green: "#008000",
//     indigo: "#4b0082",
//     khaki: "#f0e68c",
//     lightblue: "#add8e6",
//     lightcyan: "#e0ffff",
//     lightgreen: "#90ee90",
//     lightgrey: "#d3d3d3",
//     lightpink: "#ffb6c1",
//     lightyellow: "#ffffe0",
//     lime: "#00ff00",
//     magenta: "#ff00ff",
//     maroon: "#800000",
//     navy: "#000080",
//     olive: "#808000",
//     orange: "#ffa500",
//     pink: "#ffc0cb",
//     purple: "#800080",
//     violet: "#800080",
//     red: "#ff0000",
//     silver: "#c0c0c0",
//     white: "#ffffff",
//     yellow: "#ffff00"
// };

let Colors = [
    "#ff0000",
    "#0000ff",
    "#ffc0cb",
    "#800080",
    "#f0ffff",
    "#f5f5dc",
    "#000000",
    "#a52a2a",
    "#00ffff",
    "#00008b",
    "#008b8b",
    "#a9a9a9",
    "#006400",
    "#bdb76b",
    "#8b008b",
    "#556b2f",
    "#ff8c00",
    "#9932cc",
    "#8b0000",
    "#e9967a",
    "#9400d3",
    "#ff00ff",
    "#ffd700",
    "#008000",
    "#4b0082",
    "#f0e68c",
    "#add8e6",
    "#e0ffff",
    "#90ee90",
    "#d3d3d3",
    "#ffb6c1",
    "#ffffe0",
    "#00ff00",
    "#ff00ff",
    "#800000",
    "#000080",
    "#808000",
    "#ffa500"
];

let sectionProjectMap = {}
let projectColorMap = {}