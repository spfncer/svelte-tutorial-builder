export default function ComputeLocation(item: HTMLElement, box: HTMLDivElement) {
    let x = 0;
    let y = 0;

    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    const boxWidth = box.offsetWidth;
    const boxHeight = box.offsetHeight;

    const itemLeft = item.getBoundingClientRect().left + document.documentElement.scrollLeft;
    const itemTop = item.getBoundingClientRect().top + document.documentElement.scrollTop;

    const itemHoriCenter = itemLeft + (item.offsetWidth / 2);
    const itemVertCenter = itemTop + (item.offsetHeight / 2);

    const itemOffsetBottom = itemTop + item.offsetHeight;
    const itemOffsetRight = itemLeft + item.offsetWidth;

    //test 1: place box underneath item

    if (
        itemOffsetBottom + boxHeight + 50 < windowHeight //item does not exceed bottom of screen
        &&
        itemHoriCenter + boxWidth < windowWidth //does not exceed right edge
        &&
        itemHoriCenter - (boxWidth / 2) > 0 //item does not exceed left edge
    ) {
        x = itemHoriCenter - (boxWidth / 2);
        y = itemOffsetBottom + 30;
    }

    //test 2: place box to right of item    
    else if (
        itemOffsetRight + boxWidth + 50 < windowWidth //does not exceed right edge
        &&
        itemVertCenter + (box.offsetHeight / 2) < windowHeight //not exceed bottom edge
        &&
        itemVertCenter - (box.offsetHeight / 2) > 0 //does not exceed top edge
    ) {
        x = itemOffsetRight + 30;
        y = itemVertCenter - (boxHeight / 2);
    }

    //test 3: place box to left of item
    else if (
        itemLeft - boxWidth - 50 > 0 //does not exceed left edge
        &&
        itemVertCenter + (box.offsetHeight / 2) < windowHeight //does not exceed bottom edge
        &&
        itemVertCenter - (box.offsetHeight / 2) > 0 //does not exceed top edge
    ) {
        x = itemLeft - boxWidth - 30;
        y = itemVertCenter - (boxHeight / 2);
    }

    //fallback: place box above item
    else {
        x = itemHoriCenter - (boxWidth / 2);
        y = itemTop - 30;
    }

    return {
        'x': x.toString(),
        'y': y.toString()
    }
}