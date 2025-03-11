//boş bırakmama durumu:
document.getElementById("buton").addEventListener("click",function(){
    const girdi = document.getElementById("girdi").value.trim();//trim boşlukları sıfırlar böylelikle içersiinde hiçbirşey yazmıyor olarak gösterir.

    if (girdi == ""){
        alert("Lüten geçerli bir yazı yaz")
        return ;
    }

//element eklemek için

const eklenecek = document.createElement("li");
eklenecek.classList.add("flex","justify-between","py-3","px-10")
eklenecek.textContent=girdi ;
document.getElementById("liste").appendChild(eklenecek);

// çarpı butonu için 
const deleteBtn = document.createElement("i")
deleteBtn.classList.add("fa-solid", "fa-x", "delete-btn")

eklenecek.appendChild(deleteBtn)


// eleman sayısını alalım
const sayi = document.getElementById("liste")
const elemansayi = sayi.children.length;

if(elemansayi % 2 == 0){
    eklenecek.classList.add("bg-gray-200");
} else {
    eklenecek.classList.add("bg-gray-100")
}
alert("eklendi")
eklenecek.classList.add("p-3", "hover:bg-gray-400","transition","hover:duration-300")
document.getElementById("girdi").value = "" //eklendikten sonra input kısmının silinmesi için.
});

//üstüne tıklandığında vereceği tepki
document.getElementById("liste").addEventListener("click",function(event){
if(event.target.tagName==="LI"){
    if(event.target.style.textDecoration==="line-through"){
        event.target.style.textDecoration = "";
        event.target.style.backgroundColor="";
        event.target.style.color="";
    
    }else {
        event.target.style.textDecoration = "line-through";
        event.target.style.backgroundColor="#4169E1";
        event.target.style.color="white";
    }} 
if(event.target.classList.contains("delete-btn")){

    const li = event.target.closest("li");
    li.remove();
}
});
