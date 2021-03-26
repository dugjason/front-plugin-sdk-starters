const updateDraftButton = document.getElementById('updateDraft');

Front.contextUpdates.subscribe(context => {
  switch(context.type) {
    case 'noConversation':
      console.log('No conversation selected');
      break;
    case 'singleConversation':
      console.log('Selected conversation context:', context);

      updateDraftButton.addEventListener('click', async () => {
        let draftContent = await fetchDemoData()

        Front.updateDraft(
          context.conversation.draftId, 
          {
            content: {
              body: draftContent.body,
              type: 'text'
            },
            updateMode: 'insert'
          })
      })

      break;
    case 'multiConversations':
      console.log('Multiple conversations selected', context.conversations);
      break;
    default:
      console.error(`Unsupported context type: ${context.type}`);
      break;
  }
});

async function fetchDemoData() {
  let response = await fetch('https://jsonplaceholder.typicode.com/posts/1')

  return response.json()
}
