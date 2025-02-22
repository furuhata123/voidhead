
function updateTime() {
    const timeElement = document.getElementById('time');
    const now = new Date();

    const options = {
        weekday: 'short',
        hour: '2-digit',
        minute: '2-digit', 
        hour12: true,
    };
    
    const formattedTime = now.toLocaleString('en-US', options);

    timeElement.textContent = formattedTime; 
}

setInterval(updateTime, 1000);

document.addEventListener('DOMContentLoaded', function() {
    // 绑定事件到所有的 app-icon 
    document.querySelectorAll('.app-icon').forEach(function(icon) {
        icon.addEventListener('click', function() {
            const target = icon.getAttribute('data-target');
            changeWindow(target);
        });
    });
});

// 切换显示的窗口内容
function changeWindow(target) {
    // alert("in changewindow function, target:",target);

    // 如果点的是浮动窗口
    if (target === 'musicWindow'||target === 'commentWindow') {
        const window = document.getElementById(target);
        window.style.display = (window.style.display === 'block') ? 'none' : 'block';
        return;
    } 
    
    // 清除所有内容的显示状态
    document.querySelectorAll('.sidebarContent').forEach(function(sidebar) {
        sidebar.classList.remove('active');
        // alert("Removed active from sidebarContent");
    });

    document.querySelectorAll('.window-content').forEach(function(content) {
        content.classList.remove('active');
    });


    // 切换 sidebar 内容
    const targetSide = document.querySelector('#' + target + 'Side');
    if (targetSide) {
        targetSide.classList.add('active');
        if(target === 'about'){
            document.querySelector('#sideBar .custom-title span').textContent = 'Stamp place';
            document.querySelector('#mainWindow .custom-title span').textContent = '(not) About me ';
        }
        
    } else {
        // alert('No sidebar content for ' + target);
    }

    // 切换 main window 内容
    const targetContent = document.querySelector('#' + target + 'Content');
    if (targetContent) {
        targetContent.classList.add('active');
    } else {
        // alert('No main window content for ' + target);
    }
}

// 切换浮动窗口的显示状态
function toggleWindow(target) {
    const window = document.getElementById(target);

    // 如果窗口存在，切换 hidden 类
    if (window) {
        window.classList.toggle('hidden');
    }
}

// 拖动浮动窗口
function enableDrag(element) {
    let isDragging = false;
    let offsetX, offsetY;

    const maxX = window.innerWidth;
    const maxY = window.innerHeight;
    // 鼠标按下
    element.querySelector('.float-window-move').addEventListener('mousedown', (e) => {
        isDragging = true;
        offsetX = e.clientX - element.offsetLeft;
        offsetY = e.clientY - element.offsetTop;
    });

    // 鼠标移动
    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            let newLeft = e.clientX - offsetX;
            let newTop = e.clientY - offsetY;

            if (newLeft < 0) newLeft = 0; 
            if (newTop < 0) newTop = 0; 

            if (newLeft + element.offsetWidth > maxX) {
                newLeft = maxX - element.offsetWidth;
            }
            if (newTop + element.offsetHeight > maxY) {
                newTop = maxY - element.offsetHeight;
            }
            element.style.left = newLeft + 'px';
            element.style.top = newTop + 'px';
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });
}

// 初始化浮动窗口
document.querySelectorAll('.float-window').forEach(window => {
    enableDrag(window); 
});

// 使用按钮来切换浮动窗口的显示
document.querySelectorAll('.app-icon').forEach(icon => {
    icon.addEventListener('click', () => {
        const target = icon.getAttribute('data-target');
        toggleWindow(target); 
    });
});

updateTime();
