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

function fnExcelReport() {
  var tab_text = '<html xmlns:x="urn:schemas-microsoft-com:office:excel">';
  tab_text = tab_text + '<head><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>';
  tab_text = tab_text + '<x:Name>Test Sheet</x:Name>';
  tab_text = tab_text + '<x:WorksheetOptions><x:Panes></x:Panes></x:WorksheetOptions></x:ExcelWorksheet>';
  tab_text = tab_text + '</x:ExcelWorksheets></x:ExcelWorkbook></xml></head><body>';
  tab_text = tab_text + "<table border='1px'>";
  
 //get table HTML code
  tab_text = tab_text + $('#myTable').html();
  tab_text = tab_text + '</table></body></html>';
  var data_type = 'data:application/vnd.ms-excel';
 
  var ua = window.navigator.userAgent;
  var msie = ua.indexOf("MSIE ");
  //For IE
  if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
        if (window.navigator.msSaveBlob) {
        var blob = new Blob([tab_text], {type: "application/csv;charset=utf-8;"});
        navigator.msSaveBlob(blob, 'Test file.xls');
        }
  } 
  //for Chrome and Firefox 
  else {
  $('#test').attr('href', data_type + ', ' + encodeURIComponent(tab_text));
  $('#test').attr('download', 'Test file.xls');
  }
}