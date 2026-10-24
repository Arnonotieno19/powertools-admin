const catalogue = [
  [1,101,"BOS-GSB18V","Bosch GSB 18V Professional Cordless Impact Drill","Bosch","Drills & Drivers","Cordless Drills",84,18500,16900,13200,"18V","1,900 RPM"],
  [2,102,"MAK-GA9020","Makita GA9020 230mm Heavy Duty Angle Grinder","Makita","Grinders","Angle Grinders",18,14800,13200,10100,"240V","6,600 RPM"],
  [3,103,"DEW-DWE560","DeWalt 185mm Professional Circular Saw 1350W","DeWalt","Saws","Circular Saws",6,22900,20750,16400,"240V","5,500 RPM"],
  [4,104,"ING-MMA200","INGCO 200A Inverter Welding Machine","INGCO","Welding","Inverter Welders",23,19400,17700,13900,"240V","200A"],
  [5,105,"TOT-TP135","TOTAL 3.5kVA Petrol Generator Heavy Duty","TOTAL","Generators","Petrol Generators",9,64500,59000,47500,"3.5kVA","3,000 RPM"],
  [6,106,"BOS-GBH226","Bosch Professional Rotary Hammer","Bosch","Drills & Drivers","Rotary Hammers",4,28900,26500,21100,"800W","900 RPM"],
  [7,107,"MAK-DTD152","Makita Cordless Impact Driver","Makita","Drills & Drivers","Impact Drivers",31,17500,15800,12100,"18V","2,900 RPM"],
  [8,108,"DEW-DW331","DeWalt Professional Jigsaw","DeWalt","Saws","Jigsaws",0,26700,24100,19400,"701W","3,100 SPM"],
  [9,109,"ING-HPWR180","INGCO Pressure Washer 1800W","INGCO","Cleaning Equipment","Pressure Washers",12,21500,19800,15200,"1800W","150 bar"],
  [10,110,"TOT-TDLI200","TOTAL 20V Cordless Drill","TOTAL","Drills & Drivers","Cordless Drills",45,12800,11400,8700,"20V","1,500 RPM"],
  [11,111,"BOS-BAT18","Bosch 18V 5Ah Battery","Bosch","Batteries & Chargers","Batteries",72,11900,10500,7900,"18V","5Ah"],
  [12,112,"MAK-DC18RC","Makita Fast Charger","Makita","Batteries & Chargers","Chargers",27,8900,7900,5800,"240V","Fast Charge"],
];

export const products = catalogue.map(([id,variantId,sku,name,brand,category,subcategory,stock,retailPrice,wholesalePrice,costPrice,voltage,power]) => ({
  id, productId:id, variantId, sku, name, brand, category, subcategory, stock,
  retailPrice, wholesalePrice, wholesaleBasePrice:wholesalePrice, costPrice,
  shortDescription:`Professional ${name.toLowerCase()} for workshop and site applications.`,
  fullDescription:`Genuine ${brand} equipment supplied with local ToolMart support and clearly documented warranty coverage.`,
  vat:16, warranty:"12 months", weight:id === 5 ? 42 : 3.2, featured:id <= 5,
  status:stock === 0 ? "OUT_OF_STOCK" : "ACTIVE", image:null,
  specifications:[{attribute:"Voltage / Rating",value:voltage},{attribute:"Speed / Output",value:power}],
}));

export const productCategories = [...new Set(products.map((product) => product.category))];
export const productBrands = [...new Set(products.map((product) => product.brand))];
