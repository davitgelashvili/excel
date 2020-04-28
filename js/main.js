var objectkey;
var objectval;

/* set up XMLHttpRequest */
var url = "base.xls";
var oReq = new XMLHttpRequest();
oReq.open("GET", url, true);
oReq.responseType = "arraybuffer";

oReq.onload = function(e) {
  var arraybuffer = oReq.response;

  /* convert data to binary string */
  var data = new Uint8Array(arraybuffer);
  var arr = new Array();
  for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
  var bstr = arr.join("");

  /* Call XLSX */
  var workbook = XLSX.read(bstr, {type:"binary"});


workbook.SheetNames.forEach((sheet, index) => {
  let rowObject = XLSX.utils.sheet_to_row_object_array(
    workbook.Sheets[sheet]
  );
  $('.select').append(`
    <select id="${index}">
        <option value="">${sheet}</option>
    </select>
  `)

//   console.log(rowObject)
  rowObject.map((item)=>{
    insert(item, index)
    console.log(item, index)
  })
});

  /* DO SOMETHING WITH workbook HERE */
  var first_sheet_name = workbook.SheetNames[0];
  /* Get worksheet */
  var worksheet = workbook.Sheets[first_sheet_name];
//   console.log(workbook);
}

oReq.send();

function insert(item, index){
  objectkey = Object.keys(item)
  objectval = Object.values(item);

  $(`#${index}`).append(`
    <option>${item[objectkey]}<option>
  `)
}