import WorkingActivity from '~/graphql/queries/working-activity';

export function clearWorkingActivity(store) {
  const data = store.readQuery({
    query: WorkingActivity
  });
  store.writeQuery({
    query: WorkingActivity,
    data: {
      viewer: {
        ...data.viewer,
        workingActivity: null,
      }
    },
  });
}
