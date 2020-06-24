import { isMobileDevice } from './const'

// @todo connection between popup and preview
export const customEvents = popup => {
    
    const onHide = instance => { 
        instance.element.closeBtn.removeEventListener('click', e => popup.destroy(e, true) )
        instance.element.readMore.removeEventListener('click', onExpand.bind(null, instance))

        if ( isMobileDevice ) {
            window.removeEventListener('click', popup.destroy)
        } else {
            instance.removeEventListener('mouseleave', popup.destroy)	
            instance.currentTargetElement.removeEventListener('mouseleave', popup.destroy)
        }
    }
    
    const onShow = instance => { 
        instance.element = {
            wikipediapreviews: instance.querySelector('.wikipediapreviews'),
            closeBtn: instance.querySelector('.wikipediapreviews-header-closebtn'),
            readMore: instance.querySelector('.wikipediapreviews-footer-cta-readmore'),
            content: instance.querySelector('.wikipediapreviews-body > p')
        }

        // @todo update the magic number
        if ( instance.element.content.getBoundingClientRect().height < 248) {
            onExpand(instance)
        }
        
        instance.element.closeBtn.addEventListener('click', e => popup.destroy(e, true) )
        instance.element.readMore.addEventListener('click', onExpand.bind(null, instance))

        if ( isMobileDevice ) {
            window.addEventListener('click', popup.destroy)
        } else {
            instance.addEventListener('mouseleave', popup.destroy)
            instance.currentTargetElement.addEventListener('mouseleave', popup.destroy)
        }
    }
    
    const onExpand = instance => {
        instance.element.wikipediapreviews.classList.add('expanded')
    }

    return { onHide, onShow, onExpand}
}