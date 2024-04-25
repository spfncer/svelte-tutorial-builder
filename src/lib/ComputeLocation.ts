export default function ComputeLocation(item: HTMLElement, box: HTMLDivElement) {
    let x = 0;
    let y = 0;
    
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    const boxWidth = box.offsetWidth;
    const boxHeight = box.offsetHeight;

    const itemHoriCenter = item.offsetLeft + (item.offsetWidth / 2);
    const itemVertCenter = item.offsetTop + (item.offsetHeight / 2);

    const itemOffsetBottom = item.offsetTop + item.offsetHeight;
    const itemOffsetRight = item.offsetLeft + item.offsetWidth;

    //test 1: place box underneath item

    if (
        itemOffsetBottom + boxHeight + 50 < windowHeight //item does not exceed bottom of screen
        &&
        itemHoriCenter + boxWidth < windowWidth //does not exceed right edge
        &&
        itemHoriCenter - boxWidth > 0 //item does not exceed left edge
    )
    {
        x = itemHoriCenter - (boxWidth / 2);
        y = itemOffsetBottom + 30;
    }
        
    //test 2: place box to right of item    
    else if (
        itemOffsetRight + boxWidth + 50 < windowWidth //does not exceed right edge
        &&
        itemVertCenter + box.offsetHeight < windowHeight //not exceed bottom edge
        &&
        itemVertCenter - (box.offsetHeight / 2) > 0 //does not exceed top edge
    )
    {
            x = itemOffsetRight + 30;
            y = itemVertCenter - (boxHeight / 2);
    }

    //test 3: place box to left of item
    else if (
        item.offsetLeft - boxWidth - 50 > 0 //does not exceed left edge
        &&
        itemVertCenter + box.offsetHeight < windowHeight //does not exceed bottom edge
        &&
        itemVertCenter - (box.offsetHeight / 2) > 0 //does not exceed top edge
    )
    {
        x = item.offsetLeft - boxWidth -  30;
        y = itemVertCenter - (boxHeight / 2);
    }

    //fallback: place box above item
    else
    {
        x = itemHoriCenter - (boxWidth / 2);
        y = item.offsetTop - 30;
    }

    return{
        'x': x.toString(),
        'y': y.toString()
    }
}