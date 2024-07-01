let lists = document.getElementsByClassName("list");
let rightBox = document.getElementById("right");
let leftBox = document.getElementById("left");
for(i1 of lists)
{
    i1.addEventListener("dragstart",function(para)
    {
        let selected = para.target;
       rightBox.addEventListener("dragover",function(para)
       {
           para.preventDefault();
       });
        rightBox.addEventListener("drop",function(para)
        {
            rightBox.appendChild(selected);
            selected = null;
        });
       leftBox.addEventListener("dragover",function(para)
       {
            para.preventDefault();
        });
        leftBox.addEventListener("drop",function(para)
        {
            leftBox.appendChild(selected);
            selected = null;
        });
    })
}