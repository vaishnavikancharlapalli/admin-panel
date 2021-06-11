$(function()
{
    console.log("dom is ready");
    $(".formdata").submit(function(e)
{
  e.preventDefault()
})
  $("#search-box").on("input",function()
{
   let searchstring = this.value
   var gettr = $("tr")
   for(var i=0;i<gettr.length;i++)
   {
       var datastring = ""
       for(var j=0;j<5;j++)
       {
           datastring += gettr[i].childNodes[j].innerText+" "
       }
       var isPresent = datastring.toLowerCase().includes(searchstring.toLowerCase())
       if(isPresent)
       {
           gettr[i].classList.remove('display-class')
       }
       else
       {
           gettr[i].classList.add('display-class')
       }
   }

  })

    $.get("https://607e95f802a23c0017e8ba2f.mockapi.io/habib-admin",function(response)
    {
        var getdata = response;

         console.log(getdata)

for(var i=0;i<getdata.length;i++)
{
    if(i==0)
    {
    renderrows(getdata[i],i)
    }
    else
    {
        renderrows(getdata[i])
    }
}
var getallrows = document.querySelectorAll('.data-row')
for(var i = 0;i<getallrows.length;i++)
{
    
    getallrows[i].addEventListener("click",function(event)
    {
        $(".data-row").removeClass('active')
       event.currentTarget.className = "data-row active"
       const getid = event.currentTarget.firstChild.innerText
       for(var i=0;i<getdata.length;i++)
       {
           if(getdata[i].id == getid)
           {
               console.log(getdata[i])
               
               renderadress(getdata[i])
           }
       }
       
    })
}
    })
    /*
     <!---- <tr class="data-row">
                                <td class="column1">28</td>
                                <td class="column2">Larisa</td>
                                <td class="column3">Llaneza</td>
                                <td class="column4">SCallison@non.org</td>
                                <td class="column5">(763)248-9034</td>
                            </tr> -->
    */
function renderadress(getdata)
{
    var { firstName, lastName, description, address } = getdata;
    var { streetAddress, city, state, zip } = address;
  $(".info-name").html(`<b>User Selected </b> ${firstName} ${lastName}`)
     $("textarea").text(`description ${description}`);
     $(".adress").html(`<b>Address:</b> ${streetAddress}`);
     $(".city").html(`<b>City:</b> ${city}`);
     $(".state").html(`<b>State:</b> ${state} `);
     $(".zipcode").html(`<b>Zip:</b> ${zip}`);  

}
function renderrows(getdata,i)
{
    if(i==0)
    {
  var createtr = $("<tr>").addClass('data-row active')
    }
    else{
        var createtr = $("<tr>").addClass('data-row')
    }
  var createtd1 = $("<td>").addClass("column1").text(getdata.id)
  createtr.append(createtd1)
  var createtd2 = $("<td>").addClass("column2").text(getdata.firstName)
  createtr.append(createtd2)
  var createtd3 = $("<td>").addClass("column3").text(getdata.lastName)
  createtr.append(createtd3)
  var createtd4 = $("<td>").addClass("column4").text(getdata.email)
  createtr.append(createtd4)
  var createtd5 = $("<td>").addClass("column5").text(getdata.phone)
  createtr.append(createtd5)
$("tbody").append(createtr)
}


})