jest.mock("../../../src/database/models/index", () => {
    return {
        User: {
            create: jest.fn().mockImplementation(() => {
                return { firstName: "" };
            }),
        },
    };
});
